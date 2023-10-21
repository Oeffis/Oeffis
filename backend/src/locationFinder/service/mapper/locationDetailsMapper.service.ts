import { Location as VrrLocation } from "@oeffis/vrr_client/dist/vendor/VrrApiTypes";
import { LocationType } from "../../../vrr/entity/locationType.entity";
import { ApiService } from "../../../vrr/service/api.service";
import { ParentLocation } from "../../entity/location.entity";
import { LocationDetails, ParentLocationDetails } from "../../entity/locationDetails.entity";
import { LocationCoordinatesMapperService } from "./locationCoordinatesMapper.service";

const LOCATION_SHORT_NAME_FALLBACK_VAL = "";
const LOCATION_PARENT_ID_FALLBACK_VAL = "";
const LOCATION_PARENT_NAME_FALLBACK_VAL = "";
const LOCATION_PARENT_DETAILS_FALLBACK_VAL = {} as ParentLocationDetails;
const LOCATION_PARENT_FALLBACK_VAL = {
  id: LOCATION_PARENT_ID_FALLBACK_VAL,
  name: LOCATION_PARENT_NAME_FALLBACK_VAL,
  type: LocationType.unknown,
  details: LOCATION_PARENT_DETAILS_FALLBACK_VAL
} as ParentLocation;

/**
 * Service to transfer some other-typed location details to locations details of custom type {@link LocationDetails}.
 */
export class LocationDetailsMapperService {

  private readonly apiService: ApiService;
  private readonly locationCoordinatesMapper: LocationCoordinatesMapperService;

  constructor(
    apiService: ApiService,
    locationCoordinatesMapper: LocationCoordinatesMapperService
  ) {
    this.apiService = apiService;
    this.locationCoordinatesMapper = locationCoordinatesMapper;
  }

  /**
   * Maps details of given VRR location ({@link VrrLocation}) into custom location details ({@link LocationDetails}).
   * It has to be ensured, that VRR location is containing valid coordinates when calling this method.
   *
   * @param vrrLocation VRR location
   */
  mapVrrLocationDetails(vrrLocation: VrrLocation): LocationDetails {

    return {
      shortName: vrrLocation.disassembledName ?? LOCATION_SHORT_NAME_FALLBACK_VAL,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      coordinates: this.locationCoordinatesMapper.mapLocationCoordinates(vrrLocation.coord!), // Checked before.
      parent: this.mapVrrLocationParent(vrrLocation.parent)
    } as LocationDetails;
  }

  private mapVrrLocationParent(vrrLocationParent: (VrrLocation | undefined)): ParentLocation {
    if (!vrrLocationParent) {
      console.warn("VRR location is missing a parent. There will be an \"unknown\" parent object.");
      return LOCATION_PARENT_FALLBACK_VAL;
    }

    return {
      id: vrrLocationParent.id ?? LOCATION_PARENT_ID_FALLBACK_VAL,
      name: vrrLocationParent.name ?? LOCATION_PARENT_NAME_FALLBACK_VAL,
      type: this.apiService.mapVrrLocationType(vrrLocationParent.type),
      details: this.mapVrrParentLocationDetails(vrrLocationParent)
    } as ParentLocation;
  }

  private mapVrrParentLocationDetails(vrrLocationParent: VrrLocation): ParentLocationDetails {

    return {
      shortName: vrrLocationParent.disassembledName ?? undefined,
      coordinates:
        vrrLocationParent.coord && this.locationCoordinatesMapper.checkVrrCoordinatesIntegrity(vrrLocationParent.coord)
          ? this.locationCoordinatesMapper.mapLocationCoordinates(vrrLocationParent.coord) // Checked above.
          : undefined,
      parent: vrrLocationParent.parent
        ? this.mapVrrLocationParent(vrrLocationParent.parent)
        : undefined
    } as ParentLocationDetails;
  }

}
