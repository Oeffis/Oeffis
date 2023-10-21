/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from "@nestjs/common";
import { VRR_TEST_API_BASE_URL } from "@oeffis/vrr_client";
import { LocationType as VrrLocationType } from "@oeffis/vrr_client/dist/vendor/VrrApiTypes";
import { VrrClientBase } from "@oeffis/vrr_client/dist/VrrClientBase";
import { LocationType } from "vrr/entity/locationType.entity";
import { LegInfoPriority } from "../entity/legInfoPriority.entity";

type UrlConstructorType<T extends VrrClientBase> = new (baseUrl: string, ...args: unknown[]) => T;

@Injectable()
export class ApiService {
  private baseUrl = process.env.VRR_BASE_URL ?? VRR_TEST_API_BASE_URL;

  getInstanceOf<T extends VrrClientBase>(clientClass: UrlConstructorType<T>, ...args: unknown[]): T {
    return new clientClass(this.baseUrl, ...args);
  }

  public mapVrrLocationType(vrrLocationType: VrrLocationType | undefined): LocationType {
    const locationTypeMap: Record<VrrLocationType | string, LocationType> = {
      address: LocationType.address,
      crossing: LocationType.crossing,
      gis: LocationType.gis,
      locality: LocationType.locality,
      parking: LocationType.parking,
      platform: LocationType.platform,
      poi: LocationType.poi,
      poiHierarchy: LocationType.poiHierarchy,
      sharing: LocationType.sharing,
      stop: LocationType.stop,
      street: LocationType.street,
      suburb: LocationType.suburb,
      unknown: LocationType.unknown,
      singlehouse: LocationType.singlehouse
    };

    return vrrLocationType
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      ? locationTypeMap[vrrLocationType] ?? LocationType.unknown
      : LocationType.unknown;
  }

  public mapLegInfoPriority(vrrLegInfoPriority: string | undefined): LegInfoPriority {
    const legInfoPriorityMap: Record<string, LegInfoPriority> = {
      "low": LegInfoPriority.low,
      "normal": LegInfoPriority.normal,
      "high": LegInfoPriority.high,
      "veryHigh": LegInfoPriority.veryHigh
    };

    return vrrLegInfoPriority
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      ? legInfoPriorityMap[vrrLegInfoPriority] ?? LegInfoPriority.normal
      : LegInfoPriority.normal;
  }

}
