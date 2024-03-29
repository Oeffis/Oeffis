import { Inject, Injectable } from "@nestjs/common";
import { JourneyLocationElement as VrrJourneyLocation } from "@oeffis/vrr_client/dist/vendor/VrrApiTypes";
import { ParentLocation } from "../../../locationFinder/entity/location.entity";
import { LocationMapperService } from "../../../locationFinder/service/mapper/locationMapper.service";
import { LocationType } from "../../../vrr/entity/locationType.entity";
import { JourneyLocation, LegDestinationLocation, LegOriginLocation } from "../../entity/journeyLocation.entity";

/**
 * Service to transfer some other-typed journey location(s) ({@link VrrLocation}, {@link VrrJourneyLocation}) to
 * journey location(s) of custom type ({@link JourneyLocation}, {@link LegOriginLocation}, {@link
 * LegDestinationLocation}).
 */
@Injectable()
export class JourneyLocationMapperService {

  private readonly locationMapper: LocationMapperService;

  constructor(
    @Inject(LocationMapperService) locationMapper: LocationMapperService
  ) {
    this.locationMapper = locationMapper;
  }

  /**
   * Maps given VRR journey locations ({@link VrrJourneyLocation}) to custom journey locations ({@link
   * JourneyLocation}).
   *
   * @param vrrJourneyLocations VRR journey locations
   */
  mapJourneyLocations(vrrJourneyLocations: VrrJourneyLocation[]): JourneyLocation[] {
    const filteredLocations = vrrJourneyLocations.filter(location => this.checkVrrJourneyLocationIntegrity(location));

    return filteredLocations.map(journeyLocation => {
      const baseLocation = this.locationMapper.mapVrrLocation(journeyLocation);

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const arrivalTime = (journeyLocation.arrivalTimePlanned ?? journeyLocation.departureTimePlanned!);
      // It is ensured before that arrivalTimePlanned is present (not undefined).
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const departureTime = (journeyLocation.departureTimePlanned ?? journeyLocation.arrivalTimePlanned!);

      return {
        ...baseLocation,
        arrivalTimePlanned: new Date(arrivalTime),
        departureTimePlanned: new Date(departureTime)
      } as JourneyLocation;
    });
  }

  /**
   * Maps given VRR leg origin location ({@link VrrLocation}) to custom leg origin location ({@link LegOriginLocation}).
   *
   * @param vrrLegOriginLocation VRR leg origin location
   */
  mapLegOriginLocation(vrrLegOriginLocation: VrrJourneyLocation): LegOriginLocation {
    if (!this.checkVrrLegOriginLocationIntegrity(vrrLegOriginLocation)) {
      throw new Error("Given leg origin location is missing planned departure time. " +
        "Mapping is not possible.\n" + JSON.stringify(vrrLegOriginLocation));
    }

    const baseLocation = this.locationMapper.mapVrrLocation(vrrLegOriginLocation);

    // It is ensured before that departureTimePlanned is present (not undefined).
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const plannedTime = vrrLegOriginLocation.departureTimePlanned!;
    const estimatedTime = vrrLegOriginLocation.departureTimeEstimated ?? plannedTime;

    return {
      ...baseLocation,
      departureTimePlanned: new Date(plannedTime),
      departureTimeEstimated: new Date(estimatedTime)
    } as LegOriginLocation;
  }

  /**
   * Maps given VRR leg destination location ({@link VrrLocation}) to custom leg destination location
   * ({@link LegDestinationLocation}).
   *
   * @param vrrLegDestinationLocation VRR leg destination location
   */
  mapLegDestinationLocation(vrrLegDestinationLocation: VrrJourneyLocation): LegDestinationLocation {
    if (!this.checkVrrLegDestinationLocationIntegrity(vrrLegDestinationLocation)) {
      throw new Error("Given leg destination location is missing planned arrival time. " +
        "Mapping is not possible.\n" + JSON.stringify(vrrLegDestinationLocation));
    }

    const baseLocation = this.locationMapper.mapVrrLocation(vrrLegDestinationLocation);

    // It is ensured before that arrivalTimePlanned is present (not undefined).
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const plannedTime = vrrLegDestinationLocation.arrivalTimePlanned!;
    const estimatedTime = vrrLegDestinationLocation.arrivalTimeEstimated ?? plannedTime;

    return {
      ...baseLocation,
      arrivalTimePlanned: new Date(plannedTime),
      arrivalTimeEstimated: new Date(estimatedTime)
    } as LegDestinationLocation;
  }

  /**
   * Checks if given VRR journey locations are present and complete or if there is something missing to map them
   * properly.
   *
   * @param vrrJourneyLocation VRR journey locations to check
   */
  checkVrrJourneyLocationIntegrity(vrrJourneyLocation: VrrJourneyLocation): boolean {
    const hasPlannedTime = vrrJourneyLocation.arrivalTimePlanned !== undefined
      || vrrJourneyLocation.departureTimePlanned !== undefined;
    return hasPlannedTime &&
      this.locationMapper.checkVrrLocationIntegrity(vrrJourneyLocation);
  }

  /**
   * Checks if given VRR leg origin location is present and complete or if there is something missing to map it
   * properly.
   *
   * @param vrrLegOriginLocation VRR leg origin location to check
   */
  checkVrrLegOriginLocationIntegrity(vrrLegOriginLocation: VrrJourneyLocation): boolean {
    let isValid = true;

    // Check for missing departureTimePlanned within origin location.
    if (!vrrLegOriginLocation.departureTimePlanned) {

      console.error("VRR leg origin location is missing planned departure time " +
        "and therefore linked leg won´t be processed further: ", JSON.stringify(vrrLegOriginLocation));
      isValid = false;
    }

    return isValid
      && this.locationMapper.checkVrrLocationIntegrity(vrrLegOriginLocation);
  }

  /**
   * Checks if given VRR leg destination location is present and complete or if there is something missing to map it
   * properly.
   *
   * @param vrrLegDestinationLocation VRR leg destination location to check
   */
  checkVrrLegDestinationLocationIntegrity(vrrLegDestinationLocation: VrrJourneyLocation): boolean {
    let isValid = true;

    // Check for missing arrivalTimePlanned within destination location.
    if (!vrrLegDestinationLocation.arrivalTimePlanned) {

      console.error("VRR leg origin location is missing planned arrival time " +
        "and therefore linked leg won´t be processed further: ", JSON.stringify(vrrLegDestinationLocation));
      isValid = false;
    }

    return isValid
      && this.locationMapper.checkVrrLocationIntegrity(vrrLegDestinationLocation);
  }

  /**
   * Return the parent stop of given (journey) location/stop. The parent searched for has type LocationType.Stop.
   * Further parents (on higher levels) are ignored when parent of type Stop is found.
   *
   * @param stop stop to search stop parent for
   */
  public getStopParent(stop: (JourneyLocation | ParentLocation)): (JourneyLocation | ParentLocation) {
    let parentStop: (JourneyLocation | ParentLocation);

    if (stop.type === LocationType.stop) {
      parentStop = stop;

    } else if (!stop.details.parent) {
      parentStop = stop; // If there is no (more) parent.

    } else {
      parentStop = this.getStopParent(stop.details.parent);

    }

    return parentStop;
  }

}
