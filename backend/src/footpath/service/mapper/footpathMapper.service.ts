import { Injectable } from "@nestjs/common";
import { FootPathInfoClass, Leg as VrrLeg, PathDescriptionClass } from "@oeffis/vrr_client/dist/vendor/VrrApiTypes";
import { Footpath } from "../../entity/footpath.entity";

/**
 * Service to transfer some other-typed footpath information to footpath information of custom type {@link Footpath}.
 */
@Injectable()
export class FootpathMapperService {

  /**
   * Maps given VRR leg footpath information ({@link VrrLeg}) to custom footpath information ({@link Footpath}).
   *
   * @param vrrLeg VRR leg with footpath information
   */
  public mapVrrFootpath(vrrLeg: VrrLeg): Footpath {
    if (!this.checkVrrFootpathIntegrity(vrrLeg)) {
      throw new Error("Given leg has no valid footpath information. Mapping is not possible.\n" + JSON.stringify(vrrLeg));
    }

    return {
      totalDuration: this.mapVrrLegFootpathDuration(vrrLeg),
      totalDistance: this.mapVrrLegFootpathDistance(vrrLeg)
    } as Footpath;
  }

  /**
   * Checks if given VRR leg footpath information is present and complete or if there is something missing to map it
   * properly.
   *
   * @param vrrLeg VRR leg to check
   */
  public checkVrrFootpathIntegrity(vrrLeg: VrrLeg): boolean {
    let isValid = true;

    // Check if path description or footpath info is present.
    if (!vrrLeg.pathDescriptions && !vrrLeg.footPathInfo) {

      console.error("VRR leg is missing path descriptions or footpath infos which are needed to determine footpath's " +
        "distance and therefore linked journey won´t be processed further: " + JSON.stringify(vrrLeg));
      isValid = false;
    }

    return isValid;
  }

  private mapVrrLegFootpathDuration(vrrLeg: VrrLeg): number {
    const pathDescriptions = (vrrLeg.pathDescriptions as PathDescriptionClass[]);

    return vrrLeg.footPathInfo && vrrLeg.footPathInfo.length > 0
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ? (vrrLeg.footPathInfo as FootPathInfoClass[])[0].duration!
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      : pathDescriptions[pathDescriptions.length - 1].cumDuration!;
  }

  private mapVrrLegFootpathDistance(vrrLeg: VrrLeg): number | undefined {
    const pathDescriptions = (vrrLeg.pathDescriptions as PathDescriptionClass[]);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return pathDescriptions
      ? pathDescriptions[pathDescriptions.length - 1].cumDistance!
      : undefined; // If no distance is present, return undefined.
  }

}
