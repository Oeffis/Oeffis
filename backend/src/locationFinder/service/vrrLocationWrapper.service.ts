import { Injectable } from "@nestjs/common";
import { Location as VrrLocation } from "@oeffis/vrr_client/dist/vendor/VrrApiTypes";
import { Location } from "../entity/location.entity";
import { LocationDetails } from "../entity/locationDetails.entity";

@Injectable()
export class VrrLocationWrapperService {

  wrap(vrrLocations: VrrLocation[]): Location[] {

    return vrrLocations?.map(this.wrapLocation);
  }

  private wrapLocation(vrrLocation: VrrLocation): Location {
    const details: LocationDetails = {
      shortName: vrrLocation.disassembledName,
      matchQuality: vrrLocation.matchQuality,
      parent: vrrLocation.parent !== undefined
        ? this.wrapLocation(vrrLocation.parent)
        : undefined,
      latitude: (vrrLocation.coord?.[0] as number) ?? undefined,
      longitude: (vrrLocation.coord?.[1] as number) ?? undefined
    };

    return {
      id: vrrLocation.id,
      name: vrrLocation.name,
      type: vrrLocation.type,
      details: details
    };

  }

}