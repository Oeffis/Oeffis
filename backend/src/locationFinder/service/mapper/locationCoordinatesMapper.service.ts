import { Injectable } from "@nestjs/common";
import { CoordinatesClass } from "@oeffis/vrr_client/dist/vendor/VrrApiTypes";
import { LocationCoordinates } from "../../entity/locationCoordinates.entity";

/**
 * Service to transfer some other-typed location coordinates to custom location coordinates ({@link
 * LocationCoordinates}).
 */
@Injectable()
export class LocationCoordinatesMapperService {

  /**
   * Maps given VRR location coordinates to custom location coordinates ({@link LocationCoordinates}).
   *
   * @param vrrCoordinates VRR location coordinates
   */
  public mapLocationCoordinates(vrrCoordinates: (CoordinatesClass | number)[]): LocationCoordinates {
    if (!this.checkVrrCoordinatesIntegrity(vrrCoordinates)) {
      throw new Error("Given coordinates has no supported format. " +
        "Mapping is not possible.\n" + JSON.stringify(vrrCoordinates));
    }

    return {
      latitude: vrrCoordinates[0] as number,
      longitude: vrrCoordinates[1] as number
    } as LocationCoordinates;
  }

  /**
   * Checks if given VRR location coordinates are complete (latitude and longitude each as a number) or if there is
   * something missing to map them properly.
   *
   * @param vrrCoordinates VRR location coordinates to check
   */
  public checkVrrCoordinatesIntegrity(vrrCoordinates: (CoordinatesClass | number)[]): boolean {
    return vrrCoordinates.length === 2
      // Checks if both array elements are a number.
      && Number.isFinite(vrrCoordinates[0])
      && Number.isFinite(vrrCoordinates[1]);
  }

}
