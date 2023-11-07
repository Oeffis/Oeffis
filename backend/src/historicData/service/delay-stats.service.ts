import { Inject, Injectable } from "@nestjs/common";
import { differenceInMinutes } from "date-fns";
import { LegStats } from "historicData/dto/legStats.dto";
import { DelayEntryWithEstimate, HistoricDataService } from "./historicData.service";

export interface LegStatOptions {
  tripId: string;
  since?: Date;
}

@Injectable()
export class DelayStatsService {
  private readonly historicDataService: HistoricDataService;

  constructor(@Inject(HistoricDataService) historicDataService: HistoricDataService) {
    this.historicDataService = historicDataService;
  }

  public async getLegStats(legStatOptions: LegStatOptions): Promise<LegStats> {
    const entries = await this.historicDataService.getDelays(legStatOptions);
    const uniqueEntries = this.getUniqueEntries(entries);
    const delays = uniqueEntries.map(
      entry => differenceInMinutes(entry.estimated, entry.planned)
    );

    return {
      ...this.getAverageAndStdDevDelay(delays),
      maxDelay: Math.max(...delays),
      minDelay: Math.min(...delays)
    };
  }

  private getUniqueEntries(entries: DelayEntryWithEstimate[]): DelayEntryWithEstimate[] {
    const latestPerDayAndTripCode = new Map<string, DelayEntryWithEstimate>();

    entries.forEach(entry => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const rawData = JSON.parse(entry.rawData);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
      const tripCode: number = rawData.transportation.properties.tripCode;
      const key = entry.planned.toDateString() + ":" + tripCode;
      const latest = latestPerDayAndTripCode.get(key);
      if (!latest || latest.recordingTime.getTime() < entry.recordingTime.getTime()) {
        latestPerDayAndTripCode.set(key, entry);
      }
    });

    return entries;
  }

  private getAverageAndStdDevDelay(entries: number[]): { averageDelay: number, stdDev: number } {
    const averageDelay = entries.reduce((a, b) => a + b, 0) / entries.length;
    const stdDev = Math.sqrt(entries.map(x => Math.pow(x - averageDelay, 2)).reduce((a, b) => a + b, 0) / entries.length);

    return {
      averageDelay,
      stdDev
    };
  }
}
