import { Injectable } from "@nestjs/common";
import {
  Info,
  Journey as VrrJourney,
  JourneyLocationElement,
  Leg as VrrLeg,
  Transportation as VrrTransportation,
  TransportationTrip
} from "@oeffis/vrr_client/dist/vendor/VrrApiTypes";
import { Journey } from "journey/entity/journey.entity";
import { JourneyLocation } from "journey/entity/journeyLocation.entity";
import { Leg } from "journey/entity/leg.entity";
import { LegDetails } from "journey/entity/legDetails.entity";
import { LegInfo } from "journey/entity/legInfo.entity";
import { Time } from "journey/entity/time.entity";
import { Transportation } from "journey/entity/transportation.entity";
import { Trip } from "journey/entity/trip.entity";
import { LocationDetails } from "locationFinder/entity/locationDetails.entity";
import { VrrLocationWrapperService } from "locationFinder/service/vrrLocationWrapper.service";

@Injectable()
export class VrrJourneysWrapperService {

  private readonly locationWrapper: VrrLocationWrapperService;

  constructor() {
    this.locationWrapper = new VrrLocationWrapperService();
  }

  wrap(vrrJourneys: VrrJourney[]): Journey[] {
    return vrrJourneys?.map((journey) => this.wrapJourneys(journey));
  }

  private wrapTransportationTrips(vrrTransportationTrip: TransportationTrip): Trip {
    return {
      arrivalTimePlannedJourneyDestination: vrrTransportationTrip.arrivalTimePlannedJourneyDestination,
      departureTimePlannedJourneyOrigin: vrrTransportationTrip.departureTimePlannedJourneyOrigin,
      status: vrrTransportationTrip.status,
      trainNumber: vrrTransportationTrip.trainNumber
    };
  }

  private wrapTransportation(vrrTransportation: VrrTransportation): Transportation {
    return {
      name: vrrTransportation.name,
      trips: vrrTransportation.trips !== undefined
        ? vrrTransportation.trips.map((trip) => this.wrapTransportationTrips(trip))
        : undefined
    };
  }

  private wrapJourneyLocationElement(journeyLocationElement: JourneyLocationElement): JourneyLocation {

    const details: LocationDetails = {
      shortName: journeyLocationElement.disassembledName,
      matchQuality: journeyLocationElement.matchQuality,
      parent: journeyLocationElement.parent !== undefined
        ? this.locationWrapper.wrapLocation(journeyLocationElement.parent)
        : undefined,
      latitude: (journeyLocationElement.coord?.[0] as number) ?? undefined,
      longitude: (journeyLocationElement.coord?.[1] as number) ?? undefined
    };

    const arrival: Time = {
      estimated: journeyLocationElement.arrivalTimeEstimated !== undefined ? new Date(journeyLocationElement.arrivalTimeEstimated) : undefined,
      planned: journeyLocationElement.arrivalTimePlanned !== undefined ? new Date(journeyLocationElement.arrivalTimePlanned) : undefined
    };

    const departure: Time = {
      estimated: journeyLocationElement.departureTimeEstimated !== undefined ? new Date(journeyLocationElement.departureTimeEstimated) : undefined,
      planned: journeyLocationElement.departureTimePlanned !== undefined ? new Date(journeyLocationElement.departureTimePlanned) : undefined
    };

    return {
      id: journeyLocationElement.id,
      name: journeyLocationElement.name,
      type: journeyLocationElement.type,
      details: details,
      arrival: arrival,
      departure: departure
    };
  }

  private wrapLegInfos(infos: Info[]): LegInfo[] {
    return infos
      .filter(info => info.content !== undefined)
      .map(info => new LegInfo(info.content as string));
  }

  private wrapLegs(vrrLeg: VrrLeg): Leg {

    const details: LegDetails = {
      distance: vrrLeg.distance,
      duration: vrrLeg.duration,
      realtimeStatus: vrrLeg.realtimeStatus,
      infos: vrrLeg.infos !== undefined ? this.wrapLegInfos(vrrLeg.infos) : undefined,
      hints: vrrLeg.hints !== undefined ? this.wrapLegInfos(vrrLeg.hints) : undefined
    };

    return {
      origin: vrrLeg.origin !== undefined ? this.wrapJourneyLocationElement(vrrLeg.origin) : undefined,
      destination: vrrLeg.destination !== undefined ? this.wrapJourneyLocationElement(vrrLeg.destination) : undefined,
      transportation: vrrLeg.transportation !== undefined ? this.wrapTransportation(vrrLeg.transportation) : undefined,
      details: details
    };
  }

  private wrapJourneys(vrrJourney: VrrJourney): Journey {
    return {
      legs: vrrJourney.legs?.map((leg) => this.wrapLegs(leg))
    };
  }
}
