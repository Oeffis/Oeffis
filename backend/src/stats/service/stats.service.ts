import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { mkdir, readFile, writeFile } from "fs/promises";
import { DelayEntry } from "historicData/entity/delayEntry.entity";
import { RouteEntry } from "historicData/entity/routeEntry.entity";
import { join } from "path";
import { Stats, WithRoute, WorstDelayEntry } from "stats/entity/stats";
import { Like, Repository } from "typeorm";

interface RawDelayStatEntry {
  delay: string;
  estimated: Date;
  planned: Date;
  /* eslint-disable @typescript-eslint/naming-convention */
  route_id: string;
  trip_id: string;
  trip_code: string;
  /* eslint-enable @typescript-eslint/naming-convention */
}

interface DelayStatEntry {
  delay: number;
  estimated: Date;
  planned: Date;
  routeId: string;
  tripCode: string;
  tripId: string;
}

@Injectable()
export class StatsService {
  protected logger = new Logger(StatsService.name);
  protected cachedResults: Stats = {
    filled: false,
    time: new Date(),
    allTimeDelays: [],
    last24HoursDelays: []
  };
  protected currentRequest?: Promise<Stats>;
  protected lastRequestTime?: number;

  public constructor(
    @InjectRepository(DelayEntry)
    private readonly delayEntryRepository: Repository<DelayEntry>,
    @InjectRepository(RouteEntry)
    private readonly routeEntryRepository: Repository<RouteEntry>
  ) {
    this.readFileCache().then(() => {
      this.checkUpdateStats();
    }).catch(error => this.logger.error(error));
  }

  protected async readFileCache(): Promise<void> {
    const filePath = join(process.cwd(), "cache", "stats.json");
    try {
      const file = await readFile(filePath, "utf-8");
      this.logger.log("Reading stats from file cache");
      const json = JSON.parse(file);
      this.cachedResults = json.stats;
      this.lastRequestTime = json.lastRequestTime;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.code === "ENOENT") {
        this.logger.log("No stats file cache found");
        return;
      }

      throw error;
    }
  }

  public async getStats(): Promise<Stats> {
    this.checkUpdateStats();

    return this.cachedResults;
  }

  protected checkUpdateStats(): void {
    const anHour = 1000 * 60 * 60;
    if (this.currentRequest === undefined
      && (this.lastRequestTime === undefined
        || this.lastRequestTime + anHour < Date.now())) {
      void this.updateStats().catch(error => {
        this.logger.error(error);
        this.lastRequestTime = undefined;
        this.currentRequest = undefined;
      });
    }
  }

  protected async updateStats(): Promise<void> {
    this.logger.log("Updating stats");
    this.lastRequestTime = Date.now();
    this.currentRequest = this.getNewStats();
    const stats = await this.currentRequest;
    const end = new Date();
    const durationInSeconds = (end.getTime() - this.lastRequestTime) / 1000;
    this.logger.log("Updated stats in " + durationInSeconds + "s");
    this.cachedResults = stats;
    await this.writeFileCache();
    this.currentRequest = undefined;
  }

  protected async writeFileCache(): Promise<void> {
    await mkdir(join(process.cwd(), "cache"), { recursive: true });
    const filePath = join(process.cwd(), "cache", "stats.json");
    await writeFile(filePath, JSON.stringify({
      stats: this.cachedResults,
      lastRequestTime: this.lastRequestTime
    }));
  }

  protected async getNewStats(): Promise<Stats> {
    const start = new Date();
    const [allTimeDelays, last24hDelays] = await Promise.all([
      this.getMostDelayedAllTime(),
      this.getMostDelayed24Hours()
    ]);

    return {
      filled: true,
      time: start,
      allTimeDelays: allTimeDelays,
      last24HoursDelays: last24hDelays
    };
  }

  private async getMostDelayedAllTime(): Promise<WorstDelayEntry[]> {
    const delays = await this.queryMostDelayedAllTime();
    return this.mapDelays(delays);
  }

  private async getMostDelayed24Hours(): Promise<WorstDelayEntry[]> {
    const delays = await this.queryMostDelayed24Hours();
    return this.mapDelays(delays);
  }

  private async mapDelays(delays: DelayStatEntry[]): Promise<WorstDelayEntry[]> {
    const uniqueDelays = this.removeDuplicateDelays(delays);
    const topTen = uniqueDelays.slice(0, 10);
    const withRoutes = await this.addRoutes(topTen);
    return withRoutes.map(delay => ({
      routeShortName: delay.route.routeShortName!,
      routeLongName: delay.route.routeLongName!,
      routeId: delay.route.routeId,
      delay: delay.delay,
      planned: delay.planned,
      estimated: delay.estimated!
    }));
  }

  private async queryMostDelayedAllTime(): Promise<DelayStatEntry[]> {
    const maxDelays: RawDelayStatEntry[] = await this.delayEntryRepository.query(sql`
    WITH historic_with_delay AS (
      SELECT *, EXTRACT(EPOCH FROM (estimated - planned)::INTERVAL) / 60 AS delay 
      FROM historic_data
      WHERE estimated IS NOT NULL
    )
    SELECT * FROM historic_with_delay ORDER BY delay DESC LIMIT 50;
    `);

    return maxDelays.map((delay) => ({
      delay: parseFloat(delay.delay),
      planned: delay.planned,
      estimated: delay.estimated,
      routeId: delay.route_id,
      tripId: delay.trip_id,
      tripCode: delay.trip_code
    }));
  }

  private async queryMostDelayed24Hours(): Promise<DelayStatEntry[]> {
    const maxDelays: RawDelayStatEntry[] = await this.delayEntryRepository.query(sql`
    WITH historic_with_delay AS (
      SELECT *, EXTRACT(EPOCH FROM (estimated - planned)::INTERVAL) / 60 AS delay 
      FROM historic_data
      WHERE estimated IS NOT NULL
      AND estimated > NOW() - INTERVAL '1 day'
    )
    SELECT * FROM historic_with_delay ORDER BY delay DESC LIMIT 50;
    `);

    return maxDelays.map((delay) => ({
      delay: parseFloat(delay.delay),
      planned: delay.planned,
      estimated: delay.estimated,
      routeId: delay.route_id,
      tripId: delay.trip_id,
      tripCode: delay.trip_code
    }));
  }

  private removeDuplicateDelays(delays: DelayStatEntry[]): DelayStatEntry[] {
    const map = new Map<string, DelayStatEntry>();
    delays.forEach(delay => {
      const key = `${delay.tripId}-${delay.tripCode}-${delay.planned.toLocaleDateString()}`;
      const existing = map.get(key);
      if (existing && existing.delay > delay.delay) {
        return;
      }
      map.set(key, delay);
    });
    return Array.from(map.values());
  }

  private addRoutes<T extends DelayStatEntry>(delays: T[]): Promise<WithRoute<T>[]> {
    return Promise.all(delays.map(async delay => {
      const tripId = delay.tripId;
      const eva = tripId.substring(0, 6);
      const routeSubId = tripId.substring(6, 9);
      const routeId = `${eva}-${routeSubId}`.replace(/:/g, "-");

      const routes = await this.routeEntryRepository.find({
        where: {
          routeId: Like(routeId + "%")
        }
      });

      if (routes.length === 0) {
        console.warn(`No route found for ${routeId}`);
      } else if (routes.length > 1) {
        console.warn(`Multiple routes found for ${routeId}`);
      }

      return {
        ...delay,
        route: routes[0]
      };
    }));
  }
}

/** wrapper to enable syntax highlighting */
function sql(string: TemplateStringsArray): string {
  return string[0].trim();
}
