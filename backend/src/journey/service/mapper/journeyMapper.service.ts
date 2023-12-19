import { Inject, Injectable } from "@nestjs/common";
import { Journey as VrrJourney, Leg as VrrLeg } from "@oeffis/vrr_client/dist/vendor/VrrApiTypes";
import { FootpathMapperService } from "../../../footpath/service/mapper/footpathMapper.service";
import { Journey } from "../../entity/journey.entity";
import { FootpathLeg, LegType, TransportationLeg } from "../../entity/leg.entity";
import { JourneyLocationMapperService } from "./journeyLocationMapper.service";
import { JourneyStatsFactoryService, TransportationLegWithoutStats } from "./journeyStatsFactory.service";
import { LegDetailsMapperService } from "./legDetailsMapper.service";
import { TransportationMapperService } from "./transportationMapper.service";

/*
 * Fallback values to use if original data does not contain some value.
 */
const JOURNEY_INTERCHANGES_FALLBACK_VAL = 0;
const JOURNEY_LEGS_FALLBACK_VAL: (TransportationLeg | FootpathLeg)[] = [];

/**
 * Service to transfer some other-typed journeys to journeys of custom type {@link Journey}.
 */
@Injectable()
export class JourneyMapperService {

  private readonly footpathMapper: FootpathMapperService;
  private readonly transportationMapper: TransportationMapperService;
  private readonly legDetailsMapper: LegDetailsMapperService;
  private readonly journeyLocationMapper: JourneyLocationMapperService;
  private readonly journeyStatsFactory: JourneyStatsFactoryService;

  constructor(
    @Inject(FootpathMapperService) footpathMapper: FootpathMapperService,
    @Inject(TransportationMapperService) transportationMapper: TransportationMapperService,
    @Inject(LegDetailsMapperService) legDetailsMapper: LegDetailsMapperService,
    @Inject(JourneyLocationMapperService) journeyLocationMapper: JourneyLocationMapperService,
    @Inject(JourneyStatsFactoryService) journeyStatsFactory: JourneyStatsFactoryService
  ) {
    this.footpathMapper = footpathMapper;
    this.transportationMapper = transportationMapper;
    this.legDetailsMapper = legDetailsMapper;
    this.journeyLocationMapper = journeyLocationMapper;
    this.journeyStatsFactory = journeyStatsFactory;
  }

  /**
   * Maps given VRR journeys ({@link VrrJourney}) to custom journeys ({@link Journey}).
   * If given array includes some "undefined" value or invalid journeys, this values get sorted out.
   * Given an empty array, the array gets returned unchanged.
   *
   * @param vrrJourneys VRR journeys
   */
  public async mapVrrJourneys(vrrJourneys: VrrJourney[]): Promise<Journey[]> {
    return Promise.all(
      vrrJourneys
        .filter(vrrJourney => this.checkVrrJourneyIntegrity(vrrJourney))
        .map(vrrJourney => this.mapVrrJourney(vrrJourney))
    );
  }

  /**
   * Checks if given VRR journey is complete or if there is something missing to map it properly.
   *
   * @param vrrJourney VRR journey to check
   */
  public checkVrrJourneyIntegrity(vrrJourney: VrrJourney): boolean {
    let journeyHasLegs = true;

    if (!vrrJourney.legs || vrrJourney.legs.length === 0) {

      console.error("VRR journey does not contain any leg " +
        "and therefore journey won´t be processed further: " + JSON.stringify(vrrJourney));
      journeyHasLegs = false;
    }

    // It is being checked below if legs are present.
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return journeyHasLegs && (vrrJourney.legs!).every(vrrLeg =>

      // 1) Check required leg fields are present.
      this.checkVrrLegIntegrity(vrrLeg)

      // 2) Check leg details are present.
      && this.legDetailsMapper.checkVrrLegDetailsIntegrity(vrrLeg)

      // 3) If transportation leg: Check transportation is present.
      && (!this.transportationMapper.isTransportationLeg(vrrLeg)
        || this.transportationMapper.checkVrrTransportationIntegrity(vrrLeg))

      // 4) If footpath leg: Check footpath information are present.
      && (!this.transportationMapper.isFootpathLeg(vrrLeg)
        || this.footpathMapper.checkVrrFootpathIntegrity(vrrLeg))

      // 5b) Check leg origin location information are present.
      // It is checked before if origin location is present (this mapper).
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      && this.journeyLocationMapper.checkVrrLegOriginLocationIntegrity(vrrLeg.origin!)

      // 5c) Check leg destination location information are present.
      // It is checked before if destination location is present (this mapper).
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      && this.journeyLocationMapper.checkVrrLegDestinationLocationIntegrity(vrrLeg.destination!)
    );
  }

  private checkVrrLegIntegrity(vrrLeg: VrrLeg): boolean {
    let isValid = true;

    // Ignore journeys that contain legs with missing origin and/or destination.
    if (!vrrLeg.origin || !vrrLeg.destination) {

      console.error("VRR leg is missing origin or/and destination location " +
        "and therefore linked journey won´t be processed: " + JSON.stringify(vrrLeg));
      isValid = false;
    }

    return isValid;
  }

  private async mapVrrJourney(vrrJourney: VrrJourney): Promise<Journey> {
    // Filter legs of type "gesicherter Anschluss" as they should not be processed further (no useful information).
    const legsWithoutGesicherterAnschluss = vrrJourney.legs
      ?.filter(vrrLeg => !this.transportationMapper.isGesicherterAnschlussLeg(vrrLeg));

    const mappedLegs = legsWithoutGesicherterAnschluss
        ?.map(vrrLeg => this.mapVrrLeg(vrrLeg))
      ?? JOURNEY_LEGS_FALLBACK_VAL;

    const interchanges = vrrJourney.interchanges
      ?? this.calculateVrrJourneyInterchanges(legsWithoutGesicherterAnschluss)
      ?? JOURNEY_INTERCHANGES_FALLBACK_VAL;

    const mappedLegsWithStats = await this.journeyStatsFactory.enrichLegsWithStats(mappedLegs);
    const journeyStats = this.journeyStatsFactory.createJourneyStats(mappedLegsWithStats);

    return {
      interchanges: interchanges,
      legs: mappedLegsWithStats,
      journeyStats: journeyStats
    } as Journey;
  }

  /**
   * Calculates the number of interchanges for given journey legs. Result is the number of legs minus one. If there are
   * no legs, undefined is returned.
   *
   * @param vrrLegs vrr legs
   * @private
   */
  private calculateVrrJourneyInterchanges(vrrLegs: (VrrLeg[] | undefined)): (number | undefined) {
    return vrrLegs?.length && vrrLegs.length - 1 >= 0
      ? vrrLegs.length - 1
      : undefined;
  }

  private mapVrrLeg(vrrLeg: VrrLeg): (TransportationLegWithoutStats | FootpathLeg) {
    let leg: (TransportationLegWithoutStats | FootpathLeg);

    // Integrity check ensured before that origin and destination are present.
    const baseLeg = {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      origin: this.journeyLocationMapper.mapLegOriginLocation(vrrLeg.origin!),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      destination: this.journeyLocationMapper.mapLegDestinationLocation(vrrLeg.destination!),
      details: this.legDetailsMapper.mapVrrLegDetails(vrrLeg)
    };

    if (this.transportationMapper.isFootpathLeg(vrrLeg)) {
      leg = {
        ...baseLeg,
        type: LegType.footpath,
        footpath: this.footpathMapper.mapVrrFootpath(vrrLeg)
      } as FootpathLeg;
    } else {
      leg = {
        ...baseLeg,
        type: LegType.transportation,
        transportation: this.transportationMapper.mapVrrTransportation(vrrLeg)
      } as TransportationLegWithoutStats;
    }

    return leg;
  }
}
