/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { mkdir, readFile, writeFile } from "fs/promises";
import { DelayEntry } from "historicData/entity/delayEntry.entity";
import { RouteEntry } from "historicData/entity/routeEntry.entity";
import { join } from "path";
import { Stats, WithDelay, WithRoute } from "stats/entity/stats";
import { Like, Repository } from "typeorm";

@Injectable()
export class StatsService {
  protected logger = new Logger(StatsService.name);
  protected cachedResults: Stats = {
    filled: false,
    time: new Date(),
    delays: []
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

    //huh
    const filePath = join(process.cwd(), "cache", "stats.json");
    try {
      const file = await readFile(filePath, "utf-8");
      this.logger.log("Reading stats from file cache");
      const json = JSON.parse(file);
      this.cachedResults = json.stats;
      this.lastRequestTime = json.lastRequestTime;
    } catch (error: any) {
      if (error.code === "ENOENT") {
        this.logger.log("No stats file cache found");
        return;
      }

      throw error;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    const delays = await this.getMostDelayedTrips();
    const uniqueDelays = this.removeDuplicateDelays(delays);
    return {
      filled: true,
      time: start,
      delays: await this.addRoutes(uniqueDelays)
    };
  }

  private async getMostDelayedTrips(): Promise<WithDelay<DelayEntry>[]> {
    const maxDelays = await this.delayEntryRepository.query(sql`
    WITH historic_with_delay AS (
      SELECT *, EXTRACT(EPOCH FROM (estimated - planned)::INTERVAL) / 60 AS delay 
      FROM historic_data
      WHERE estimated IS NOT NULL
    )
    SELECT * FROM historic_with_delay WHERE delay > 1000 ORDER BY delay DESC LIMIT 10;
    `);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    maxDelays.forEach((delay: any) => {
      for (const key in delay) {
        delay[key.replace(/_\w/g, (m) => m[1].toUpperCase())] = delay[key];
      }
    });
    return maxDelays;
  }

  private removeDuplicateDelays(delays: WithDelay<DelayEntry>[]): WithDelay<DelayEntry>[] {
    const map = new Map<string, WithDelay<DelayEntry>>();
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

  private addRoutes<T extends DelayEntry>(delays: T[]): Promise<WithRoute<T>[]> {
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
