import { Inject, Injectable } from "@nestjs/common";
import { OmitType } from "@nestjs/swagger";
import { subWeeks } from "date-fns";
import { InterchangeReachableStat } from "../../../historicData/dto/interchangeReachableStat.dto";
import { JourneyStats } from "../../../historicData/dto/journeyStats.dto";
import { LegStats } from "../../../historicData/dto/legStats.dto";
import { UnavailableStats } from "../../../historicData/dto/maybeStats.dto";
import { HistoricDataService } from "../../../historicData/service/historicData.service";
import { HistoricDataProcessorService } from "../../../historicData/service/historicDataProcessor.service";
import { DelayAtStopAndTimeOptions, DelayAtStopOptions } from "../../../historicData/service/query/delayAtStop.query";
import { NO_DATA_RESULT } from "../../../historicData/service/query/historicDataQueryRunner.service";
import { FootpathLeg, TransportationLeg } from "../../entity/leg.entity";
import { JourneyLocationMapperService } from "./journeyLocationMapper.service";

/*
 * Fallback values to use if original data does not contain some value.
 */
const LEG_INTERCHANGE_FOOTPATH_DURATION_FALLBACK_VAL = 0;

/*
 * Configuration of time-frame to consider when requesting historic data.
 */
const HISTORIC_DATA_SINCE = subWeeks(new Date(), 2);

@Injectable()
export class JourneyStatsFactoryService {

  private readonly historicDataService: HistoricDataService;
  private readonly historicDataProcessor: HistoricDataProcessorService;
  private readonly journeyLocationMapper: JourneyLocationMapperService;

  constructor(
    @Inject(HistoricDataService) historicDataService: HistoricDataService,
    @Inject(HistoricDataProcessorService) historicDataProcessor: HistoricDataProcessorService,
    @Inject(JourneyLocationMapperService) journeyLocationMapper: JourneyLocationMapperService
  ) {
    this.historicDataService = historicDataService;
    this.historicDataProcessor = historicDataProcessor;
    this.journeyLocationMapper = journeyLocationMapper;
  }

  /**
   * Enriches given legs with leg stats that will be retrieved from historic data.
   *
   * @param mappedLegs legs to enrich
   */
  public async enrichLegsWithStats(
    mappedLegs: (TransportationLegWithoutStats | FootpathLeg)[]
  ): Promise<(TransportationLeg | FootpathLeg)[]> {
    /*
     * Iterate over all legs. If it is a footpath leg, add it to result array unchanged.
     * If it is a transportation leg, that should get enriched, do following:
     *  i.   determine next following transportation leg (if present)
     *  ii.  determine intermediate footpath leg between current and next (if present)
     *  iii. create leg stats
     *  iv.  add transportation leg with stats to result array
     */
    const enrichedLegs: (TransportationLeg | FootpathLeg)[] = [];
    for (let legIndex = 0; legIndex < mappedLegs.length; legIndex++) {
      const currentLeg = mappedLegs[legIndex];

      if (TransportationLegWithoutStats.isTransportationLeg(currentLeg)) {
        const currentTransportationLeg = currentLeg as TransportationLegWithoutStats;
        // Determine next transportation leg + intermediate footpath (if present).
        const nextTransportationLeg = this.getNextTransportationLeg(legIndex, mappedLegs);
        const intermediateFootpathLeg = this.getIntermediateFootpathLeg(legIndex, mappedLegs, nextTransportationLeg);

        const enrichedTransportationLeg = {
          ...currentTransportationLeg,
          legStats: await this.createLegStats(currentLeg, intermediateFootpathLeg, nextTransportationLeg)
        } as TransportationLeg;
        enrichedLegs.push(enrichedTransportationLeg);

      } else {
        // If no transportation leg, simply add leg to result array without changes.
        enrichedLegs.push(currentLeg);

      }
    }

    return enrichedLegs;
  }

  /**
   * Returns next transportation leg of given legs array from current leg's index. If there is no next transportation
   * leg, undefined is returned.
   *
   * @param currentLegIndex index of current transportation leg
   * @param legs array of all legs
   * @private
   */
  private getNextTransportationLeg(
    currentLegIndex: number,
    legs: (TransportationLegWithoutStats | FootpathLeg)[]
  ): TransportationLegWithoutStats | undefined {

    return legs
      // Only elements following current leg (index) are to consider.
      .filter((_value, index) => index > currentLegIndex)
      // Find first element that is a transportation leg (if none, undefined is returned).
      .find(TransportationLegWithoutStats.isTransportationLeg);
  }

  /**
   * Returns intermediate footpath leg between current and next transportation leg. If there is none, undefined gets
   * returned.
   *
   * @param currentLegIndex index of current transportation leg
   * @param legs array of all legs
   * @param nextLeg next transportation leg (if present)
   * @private
   */
  private getIntermediateFootpathLeg(
    currentLegIndex: number,
    legs: (TransportationLegWithoutStats | FootpathLeg)[],
    nextLeg?: TransportationLegWithoutStats
  ): FootpathLeg | undefined {
    // Determine index of next leg (if present).
    const nextLegIndex = nextLeg
      ? legs.indexOf(nextLeg)
      : undefined;

    // If there is a next leg index and a gab between current and next with a footpath leg, return it.
    return nextLegIndex !== undefined
    && Math.abs(currentLegIndex - nextLegIndex) === 2
    && FootpathLeg.isFootpathLeg(legs[currentLegIndex + 1] as (TransportationLeg | FootpathLeg))
      ? legs[currentLegIndex + 1] as FootpathLeg
      : undefined;
  }

  private async createLegStats(
    currentLeg: TransportationLegWithoutStats,
    intermediateFootpathLeg?: FootpathLeg,
    nextTransportationLeg?: TransportationLegWithoutStats): Promise<LegStats> {

    // TripId is needed to determine transportation line being taken between two points A (origin) and B (destination).
    const tripId = currentLeg.transportation.id;
    const originParentStopId = this.journeyLocationMapper.getStopParent(currentLeg.origin).id;
    const destinationParentStopId = this.journeyLocationMapper.getStopParent(currentLeg.destination).id;
    const plannedDestinationArrival = currentLeg.destination.arrivalTimePlanned;

    const delayAtOriginOptions: DelayAtStopOptions =
      { tripId: tripId, stopId: originParentStopId, since: HISTORIC_DATA_SINCE };
    const delayAtDestinationOptions: DelayAtStopOptions =
      { tripId: tripId, stopId: destinationParentStopId, since: HISTORIC_DATA_SINCE };

    const originDelayStats =
      await this.historicDataService.getDelayStatsAtStation(delayAtOriginOptions);
    const destinationDelayStats =
      await this.historicDataService.getDelayStatsAtStation(delayAtDestinationOptions);

    const interchangeReachableStat = nextTransportationLeg !== undefined
      ? await this.createInterchangeReachableStat(
        currentLeg,
        { tripId: tripId, stopId: destinationParentStopId, plannedTime: plannedDestinationArrival },
        nextTransportationLeg, intermediateFootpathLeg)
      : NO_DATA_RESULT;

    const cancellationStat =
      await this.historicDataService.getCancellationStat({
        tripId: tripId,
        originStopId: originParentStopId,
        destinationStopId: destinationParentStopId,
        since: HISTORIC_DATA_SINCE
      });

    return {
      originDelayStats: originDelayStats,
      destinationDelayStats: destinationDelayStats,
      interchangeReachableStat: interchangeReachableStat,
      cancellationStat: cancellationStat
    } as LegStats;
  }

  private async createInterchangeReachableStat(
    currentLeg: TransportationLegWithoutStats,
    delayAtCurrentLegDestinationOptions: DelayAtStopAndTimeOptions,
    nextTransportationLeg: TransportationLegWithoutStats,
    intermediateFootpathLeg?: FootpathLeg
  ): Promise<InterchangeReachableStat | UnavailableStats> {

    const nextTripId = nextTransportationLeg.transportation.id;
    const nextOriginParentStopId = this.journeyLocationMapper.getStopParent(nextTransportationLeg.origin).id;
    const delayAtNextTripOriginOptions: DelayAtStopAndTimeOptions = {
      tripId: nextTripId,
      stopId: nextOriginParentStopId,
      plannedTime: nextTransportationLeg.origin.departureTimePlanned
    };

    const footpathTimeForInterchange = this.getFootpathTimeForInterchange(currentLeg, intermediateFootpathLeg)
      ?? LEG_INTERCHANGE_FOOTPATH_DURATION_FALLBACK_VAL;

    return await this.historicDataService.getInterchangeReachableStat({
      currentTripOptions: delayAtCurrentLegDestinationOptions,
      nextTripOptions: delayAtNextTripOriginOptions,
      interchangeFootpathTime: footpathTimeForInterchange,
      since: HISTORIC_DATA_SINCE
    });
  }

  /**
   * Returns the time needed for footpath at an interchange. If there is a separate footpath leg following current leg,
   * this is used to extract time needed. Otherwise, current leg's information are used.
   *
   * @param currentLeg current leg
   * @param footpathLeg footpath leg (following current leg)
   * @private
   */
  private getFootpathTimeForInterchange(
    currentLeg: TransportationLegWithoutStats,
    footpathLeg?: FootpathLeg
  ): number | undefined {

    // If intermediate footpath within interchange is present, use its duration. Otherwise, use current leg's duration.
    return footpathLeg
      ? footpathLeg.footpath.totalDuration
      : currentLeg.details.interchange?.footpath.totalDuration;
  }

  /**
   * Creates journey stats by aggregating all leg stats given.
   *
   * @param mappedLegsWithStats mapped legs with leg stats
   */
  public createJourneyStats(mappedLegsWithStats: (TransportationLeg | FootpathLeg)[]): JourneyStats {
    // Filter TransportationLegs as only they have LegStats.
    const allLegStats = mappedLegsWithStats
      .filter(TransportationLeg.isTransportationLeg)
      .map(leg => (leg as TransportationLeg).legStats);

    return {
      aggregatedDelayStats: this.historicDataProcessor.getAggregatedDelayStats(allLegStats),
      aggregatedInterchangeReachableStat: this.historicDataProcessor.getAggregatedInterchangeReachableStat(allLegStats),
      aggregatedCancellationStat: this.historicDataProcessor.getAggregatedCancellationStat(allLegStats)
    } as JourneyStats;
  }

}

/**
 * Special variant of {@link TransportationLeg} that does not contain leg stats yet because mapped legs are needed to
 * calculate all stats. Only used temporarily during mapping process.
 */
export class TransportationLegWithoutStats
  extends OmitType(TransportationLeg, ["legStats"] as const) {

  public static isTransportationLeg(
    leg: TransportationLegWithoutStats | FootpathLeg
  ): leg is TransportationLegWithoutStats {

    return TransportationLeg.isTransportationLeg(leg as (TransportationLeg | FootpathLeg));
  }
}
