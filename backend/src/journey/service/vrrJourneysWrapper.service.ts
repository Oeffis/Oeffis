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

  private wrapTransporationTrips(vrrTransporationTrip: TransportationTrip): Trip {
    return {
      arrivalTimePlannedJourneyDestination: vrrTransporationTrip.arrivalTimePlannedJourneyDestination,
      departureTimePlannedJourneyOrigin: vrrTransporationTrip.departureTimePlannedJourneyOrigin,
      status: vrrTransporationTrip.status,
      trainNumber: vrrTransporationTrip.trainNumber
    };
  }

  private wrapTransportation(vrrTransportation: VrrTransportation): Transportation {
    return {
      name: vrrTransportation.name,
      trips: vrrTransportation.trips?.map((trip) => this.wrapTransporationTrips(trip)) ?? []
    };
  }

  private wrapJourneyLocatoinElement(journeyLocatoinElement: JourneyLocationElement): JourneyLocation {

    const details: LocationDetails = {
      shortName: journeyLocatoinElement.disassembledName,
      matchQuality: journeyLocatoinElement.matchQuality,
      parent: journeyLocatoinElement.parent !== undefined
        ? this.locationWrapper.wrapLocation(journeyLocatoinElement.parent)
        : undefined,
      latitude: (journeyLocatoinElement.coord?.[0] as number) ?? undefined,
      longitude: (journeyLocatoinElement.coord?.[1] as number) ?? undefined
    };

    const arrival: Time = {
      timeBaseTimetable: journeyLocatoinElement.arrivalTimeBaseTimetable,
      timeEstimated: journeyLocatoinElement.arrivalTimeEstimated,
      timePlanned: journeyLocatoinElement.arrivalTimePlanned
    };

    const departure: Time = {
      timeBaseTimetable: journeyLocatoinElement.departureTimeBaseTimetable,
      timeEstimated: journeyLocatoinElement.departureTimeEstimated,
      timePlanned: journeyLocatoinElement.departureTimePlanned
    };

    return {
      id: journeyLocatoinElement.id,
      name: journeyLocatoinElement.name,
      type: journeyLocatoinElement.type,
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
      origin: this.wrapJourneyLocatoinElement(vrrLeg.origin ?? {}),
      destination: this.wrapJourneyLocatoinElement(vrrLeg.destination ?? {}),
      transportation: this.wrapTransportation(vrrLeg.transportation ?? {}),
      details: details
    };
  }

  private wrapJourneys(vrrJoruney: VrrJourney): Journey {
    return {
      legs: vrrJoruney.legs?.map((leg) => this.wrapLegs(leg))
    };
  }

}
