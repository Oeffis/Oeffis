import { Inject, Injectable } from "@nestjs/common";
import { AssignedLocation, Location as VrrLocation } from "@oeffis/vrr_client/dist/vendor/VrrApiTypes";
import { ApiService } from "vrr/service/api.service";
import { Location, LocationWithAssignedStops, RatedLocation } from "../../entity/location.entity";
import { LocationCoordinatesMapperService } from "./locationCoordinatesMapper.service";
import { LocationDetailsMapperService } from "./locationDetailsMapper.service";

const LOCATION_NAME_FALLBACK_VAL = "";
const LOCATION_RATING_FALLBACK_VAL = 0;
const LOCATION_ASSIGNED_STOPS_FALLBACK_VAL: AssignedLocation[] = [];

/**
 * Service to transfer some other-typed locations to locations of custom type {@link Location}.
 */
@Injectable()
export class LocationMapperService {

  private readonly apiService: ApiService;
  private readonly locationCoordinatesMapper: LocationCoordinatesMapperService;
  private readonly detailsMapper: LocationDetailsMapperService;

  constructor(
    @Inject(ApiService) apiService: ApiService,
    @Inject(LocationCoordinatesMapperService) locationCoordinatesMapper: LocationCoordinatesMapperService
  ) {
    this.apiService = apiService;
    this.locationCoordinatesMapper = locationCoordinatesMapper;
    this.detailsMapper = new LocationDetailsMapperService(apiService, locationCoordinatesMapper);
  }

  /**
   * Maps given VRR location ({@link VrrLocation}) to custom location ({@link Location}).
   *
   * @param vrrLocation VRR location
   */
  public mapVrrLocation(vrrLocation: VrrLocation): Location {
    if (!this.checkVrrLocationIntegrity(vrrLocation)) {
      throw new Error("Given location is not complete. Mapping is not possible.\n" + JSON.stringify(vrrLocation));
    }

    return {
      id: vrrLocation.id,
      name: vrrLocation.name ?? LOCATION_NAME_FALLBACK_VAL,
      type: this.apiService.mapVrrLocationType(vrrLocation.type),
      details: this.detailsMapper.mapVrrLocationDetails(vrrLocation)
    } as Location;
  }

  /**
   * Maps given VRR locations ({@link VrrLocation}), that are including a rating, into custom rated locations
   * ({@link RatedLocation}). If given array includes some "undefined" or "null" value, this value gets sorted out.
   * Given an empty array, the array gets returned unchanged.
   *
   * @param vrrLocations VRR locations with rating
   */
  mapRatedVrrLocations(vrrLocations: VrrLocation[]): RatedLocation[] {
    return vrrLocations
      .filter(vrrLocation => this.checkVrrLocationIntegrity(vrrLocation))
      .map(vrrLocation =>
        ({
          ...this.mapVrrLocation(vrrLocation),
          rating: vrrLocation.matchQuality ?? LOCATION_RATING_FALLBACK_VAL
        } as RatedLocation)
      );
  }

  /**
   * Maps given VRR location ({@link VrrLocation}), that includes multiple other rated locations ({@link
   * RatedLocation}) as assigned stops.
   *
   * @param vrrLocation VRR location with assigned stops
   */
  mapVrrLocationWithAssignedStops(vrrLocation: VrrLocation): LocationWithAssignedStops {
    if (!this.checkVrrLocationIntegrity(vrrLocation)) {
      throw new Error("Given location is not complete. Mapping is not possible.\n" + JSON.stringify(vrrLocation));
    }

    const mappedLocation: Location = this.mapVrrLocation(vrrLocation);
    const assignedStops: AssignedLocation[] = vrrLocation.assignedStops ?? LOCATION_ASSIGNED_STOPS_FALLBACK_VAL;
    this.calculateMatchQualityForAssignedStops(assignedStops);

    return {
      ...mappedLocation,
      assignedStops: this.mapRatedVrrLocations(assignedStops)
    } as LocationWithAssignedStops;
  }

  /**
   * Checks if given VRR location is complete or if there is something missing to map it properly.
   *
   * @param vrrLocation VRR location to check
   */
  public checkVrrLocationIntegrity(vrrLocation: VrrLocation): boolean {
    let isValid = true;

    if (!vrrLocation.id) {
      console.error("VRR location is missing an id " +
        "and therefore won´t be processed further: " + JSON.stringify(vrrLocation));
      isValid = false;
    }

    if (!vrrLocation.coord) {
      console.warn("VRR location is missing coordinates " +
        "and therefore won´t be processed further: " + JSON.stringify(vrrLocation));
      isValid = false;
    }

    return isValid
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      && this.locationCoordinatesMapper.checkVrrCoordinatesIntegrity(vrrLocation.coord!); // Checked above.
  }

  /**
   * Calculates a matchQuality given for all assignedStops. It gets "calculated" by sorting all given stops by distance
   * and assigning decreasing values from 1000 to 0 from nearest to most far stop.
   *
   * @param assignedStops all assigned stops
   */
  private calculateMatchQualityForAssignedStops(assignedStops: AssignedLocation[]): void {
    assignedStops.sort((stop1, stop2) =>
      (stop1.duration ?? 0) > (stop2.duration ?? 0)
        ? -1
        : 1
    );
  }

}
