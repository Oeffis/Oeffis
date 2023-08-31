import { Inject, Injectable } from "@nestjs/common";
import { Location as VrrLocation } from "@oeffis/vrr_client/dist/vendor/VrrApiTypes";
import { ApiService } from "vrr/service/api.service";
import { Location } from "../entity/location.entity";
import { LocationDetails } from "../entity/locationDetails.entity";

@Injectable()
export class VrrLocationWrapperService {

  private readonly apiService: ApiService;

  constructor(
    @Inject() apiService: ApiService
  ) {
    this.apiService = apiService;
  }

  wrap(vrrLocations: VrrLocation[]): Location[] {
    return vrrLocations
      .map(vrrLocation => this.wrapLocation(vrrLocation))
      // Removing all "undefined" entries.
      .filter(location => location !== undefined)
      .map(location => location as Location);
  }

  public wrapLocation(vrrLocation: VrrLocation | undefined): (Location | undefined) {
    if (vrrLocation === undefined) {
      return undefined;
    }

    return {
      id: vrrLocation.id,
      name: vrrLocation.name,
      type: this.apiService.mapLocationType(vrrLocation.type),
      details: this.wrapLocationDetails(vrrLocation)
    };
  }

  public wrapLocationDetails(vrrLocation: VrrLocation): LocationDetails {
    return <LocationDetails>{
      shortName: vrrLocation.disassembledName,
      matchQuality: vrrLocation.matchQuality,
      parent: this.wrapLocation(vrrLocation.parent),
      latitude: (vrrLocation.coord?.[0] as number) ?? undefined,
      longitude: (vrrLocation.coord?.[1] as number) ?? undefined
    };
  }

}
