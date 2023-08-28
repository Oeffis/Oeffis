import { Injectable } from "@nestjs/common";
import { JourneyLocationElement, TransportationTrip, Journey as VrrJourney, Leg as VrrLeg, Transportation as VrrTransportation } from "@oeffis/vrr_client/dist/vendor/VrrApiTypes";
import { Journey } from "journey/entity/journey.entity";
import { JourneyLocation } from "journey/entity/journeyLocation.entity";
import { Leg } from "journey/entity/leg.entity";
import { LegDetails } from "journey/entity/legDetails.entity";
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
      trips: vrrTransportation.trips?.map((trip) => this.wrapTransportationTrips(trip)) ?? []
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
      timeBaseTimetable: journeyLocationElement.arrivalTimeBaseTimetable,
      timeEstimated: journeyLocationElement.arrivalTimeEstimated,
      timePlanned: journeyLocationElement.arrivalTimePlanned
    };

    const departure: Time = {
      timeBaseTimetable: journeyLocationElement.departureTimeBaseTimetable,
      timeEstimated: journeyLocationElement.departureTimeEstimated,
      timePlanned: journeyLocationElement.departureTimePlanned
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

  private wrapLegs(vrrLeg: VrrLeg): Leg {

    const details: LegDetails = {
      distance: vrrLeg.distance,
      duration: vrrLeg.duration
      // ???
    };

    return {
      origin: this.wrapJourneyLocationElement(vrrLeg.origin ?? {}),
      destination: this.wrapJourneyLocationElement(vrrLeg.destination ?? {}),
      transportation: this.wrapTransportation(vrrLeg.transportation ?? {}),
      details: details
    };
  }

  private wrapJourneys(vrrJourney: VrrJourney): Journey {
    return {
      legs: vrrJourney.legs?.map((leg) => this.wrapLegs(leg))
    };
  }

}
