import { Inject, Injectable } from "@nestjs/common";
import {
  Info,
  JourneyLocationElement,
  TransportationTrip,
  Journey as VrrJourney,
  Leg as VrrLeg,
  Transportation as VrrTransportation
} from "@oeffis/vrr_client/dist/vendor/VrrApiTypes";
import { Journey } from "journey/entity/journey.entity";
import { JourneyLocation } from "journey/entity/journeyLocation.entity";
import { Leg } from "journey/entity/leg.entity";
import { LegDetails } from "journey/entity/legDetails.entity";
import { LegInfo } from "journey/entity/legInfo.entity";
import { Time } from "journey/entity/time.entity";
import { Transportation } from "journey/entity/transportation.entity";
import { Trip } from "journey/entity/trip.entity";
import { VrrLocationWrapperService } from "locationFinder/service/vrrLocationWrapper.service";
import { LegRealtimeTripStatus } from "vrr/entity/legRealtimeTripStatus.entity";
import { ApiService } from "vrr/service/api.service";

@Injectable()
export class VrrJourneysWrapperService {

  private readonly apiService: ApiService;
  private readonly locationWrapper: VrrLocationWrapperService;

  constructor(
    @Inject(ApiService) apiService: ApiService,
    @Inject(VrrLocationWrapperService) locationWrapper: VrrLocationWrapperService
  ) {
    this.apiService = apiService;
    this.locationWrapper = locationWrapper;
  }

  wrap(vrrJourneys: VrrJourney[]): Journey[] {
    return vrrJourneys?.map((journey) => this.wrapJourneys(journey));
  }

  private wrapTransportationTrips(vrrTransportationTrips: (TransportationTrip[] | undefined)): (Trip[] | undefined) {
    if (vrrTransportationTrips === undefined) {
      return undefined;
    }

    return vrrTransportationTrips.map((trip: TransportationTrip) => (
      {
        arrivalTimePlannedJourneyDestination: trip.arrivalTimePlannedJourneyDestination,
        departureTimePlannedJourneyOrigin: trip.departureTimePlannedJourneyOrigin,
        status: trip.status,
        trainNumber: trip.trainNumber
      }
    ));
  }

  private wrapTransportation(vrrTransportation: (VrrTransportation | undefined)): (Transportation | undefined) {
    return vrrTransportation !== undefined
      ? {
        name: vrrTransportation.name,
        trips: this.wrapTransportationTrips(vrrTransportation.trips) || []
      }
      : undefined;
  }

  private wrapJourneyLocationElement(journeyLocationElement: (JourneyLocationElement | undefined)): (JourneyLocation | undefined) {
    if (journeyLocationElement === undefined) {
      return undefined;
    }

    const arrival: Time = {
      estimated: this.parseTime(journeyLocationElement.arrivalTimeEstimated),
      planned: this.parseTime(journeyLocationElement.arrivalTimePlanned)
    };

    const departure: Time = {
      estimated: this.parseTime(journeyLocationElement.departureTimeEstimated),
      planned: this.parseTime(journeyLocationElement.departureTimePlanned)
    };

    return {
      id: journeyLocationElement.id,
      name: journeyLocationElement.name,
      type: this.apiService.mapLocationType(journeyLocationElement.type),
      details: this.locationWrapper.wrapLocationDetails(journeyLocationElement),
      arrival: arrival,
      departure: departure
    };
  }

  private parseTime(timeAsString: (string | undefined)): (Date | undefined) {
    return timeAsString !== undefined
      ? new Date(timeAsString)
      : undefined;
  }

  private wrapLegInfos(infos: (Info[] | undefined)): (LegInfo[] | undefined) {
    if (infos === undefined) {
      return undefined;
    }

    return infos
      .filter(info => info.content !== undefined)
      .map(info => new LegInfo(info.content as string));
  }

  private wrapLegs(vrrLeg: VrrLeg): Leg {
    const realTimeTripStatus = vrrLeg?.realtimeStatus
      ?.map((status) => this.apiService.mapRealTimeTripStatus(status))
      .filter((status) => status !== undefined) as LegRealtimeTripStatus[];

    const details: LegDetails = {
      distance: vrrLeg.distance,
      duration: vrrLeg.duration,
      realtimeTripStatus: realTimeTripStatus,
      infos: this.wrapLegInfos(vrrLeg.infos) || [],
      hints: this.wrapLegInfos(vrrLeg.hints) || []
    };

    return {
      origin: this.wrapJourneyLocationElement(vrrLeg.origin),
      destination: this.wrapJourneyLocationElement(vrrLeg.destination),
      transportation: this.wrapTransportation(vrrLeg.transportation),
      details: details
    };
  }

  private wrapJourneys(vrrJourney: VrrJourney): Journey {
    return {
      legs: vrrJourney.legs?.map((leg) => this.wrapLegs(leg))
    };
  }
}
