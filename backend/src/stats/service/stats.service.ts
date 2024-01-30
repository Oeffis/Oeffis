/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DelayEntry } from "historicData/entity/delayEntry.entity";
import { RouteEntry } from "historicData/entity/routeEntry.entity";
import { Stats, WithDelay, WithRoute } from "stats/entity/stats";
import { Like, Repository } from "typeorm";

@Injectable()
export class StatsService {
  public constructor(
    @InjectRepository(DelayEntry)
    private readonly delayEntryRepository: Repository<DelayEntry>,
    @InjectRepository(RouteEntry)
    private readonly routeEntryRepository: Repository<RouteEntry>
  ) { }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async getStats(): Promise<Stats> {
    const delays = await this.getMostDelayedTrips();
    const uniqueDelays = this.removeDuplicateDelays(delays);
    return {
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
