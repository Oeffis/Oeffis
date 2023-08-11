import { Injectable } from "@nestjs/common";
import { Journey } from "trip_query/entity/Journey.entity";
import { JourneyLocationElement, TransportationTrip, Journey as VrrJourney } from "@oeffis/vrr_client/dist/vendor/VrrApiTypes";
import { Leg } from "trip_query/entity/Leg.entity";
import { Leg as VrrLeg } from "@oeffis/vrr_client/dist/vendor/VrrApiTypes";
import { LegDetails } from "trip_query/entity/LegDetails.entity";
import { JourneyLocation } from "trip_query/entity/JourneyLocation.entity";
import { Time } from "trip_query/entity/Time.entity";
import { Location } from "locationFinder/entity/location.entity";
import { LocationDetails } from "locationFinder/entity/locationDetails.entity";
import { Transportation } from "trip_query/entity/Transportation.entity";
import { Transportation as VrrTransportation } from "@oeffis/vrr_client/dist/vendor/VrrApiTypes";
import { Trip } from "trip_query/entity/Trip.entity";
import { Location as VrrLocation } from "@oeffis/vrr_client/dist/vendor/VrrApiTypes";
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
      trips: vrrTransportation.trips?.map(this.wrapTransporationTrips) ?? []
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
