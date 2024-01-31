import { Inject, Injectable } from "@nestjs/common";
import { Leg as VrrLeg, Location as VrrLocation } from "@oeffis/vrr_client/dist/vendor/VrrApiTypes";
import { ApiService } from "../../../vrr/service/api.service";
import { Transportation, TransportationDestination } from "../../entity/transportation.entity";

const TRANSPORTATION_ID_FALLBACK_VAL = "";
const TRANSPORTATION_OPERATOR_NAME_FALLBACK_VAL = "";
const TRANSPORTATION_HINTS_FALLBACK_VAL: string[] = [];
const TRANSPORTATION_DESTINATION_ID_FALLBACK_VAL = "";

/**
 * Service to transfer some other-typed journey transportation to transportation of custom type {@link Transportation}.
 */
@Injectable()
export class TransportationMapperService {

  private readonly apiService: ApiService;

  constructor(
    @Inject(ApiService) apiService: ApiService
  ) {
    this.apiService = apiService;
  }

  /**
   * Maps given VRR leg transportation ({@link VrrLeg}) to custom transportation ({@link Transportation}).
   *
   * @param vrrLeg VRR leg with transportation
   */
  mapVrrTransportation(vrrLeg: VrrLeg): Transportation {
    if (!this.checkVrrTransportationIntegrity(vrrLeg)) {
      throw new Error("Given leg has no valid transportation. Mapping is not possible.\n" + JSON.stringify(vrrLeg));
    }

    // It is checked above that vrrLeg contains a transportation.
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const vrrTransportation = vrrLeg.transportation!;

    return {
      id: vrrTransportation.id ?? TRANSPORTATION_ID_FALLBACK_VAL,
      name: vrrTransportation.name,
      line: vrrTransportation.number ?? vrrTransportation.disassembledName,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      destination: this.mapVrrTransportationDestination(vrrTransportation.destination!), // Checked above.
      operator: vrrTransportation.operator?.name ?? TRANSPORTATION_OPERATOR_NAME_FALLBACK_VAL,
      hints: vrrLeg.hints ?? TRANSPORTATION_HINTS_FALLBACK_VAL
    } as Transportation;
  }

  /**
   * Checks if given VRR leg transportation is present and complete or if there is something missing to map it properly.
   *
   * @param vrrLeg VRR leg to check
   */
  checkVrrTransportationIntegrity(vrrLeg: VrrLeg): boolean {
    let isValid = true;

    // Check for missing transportation.
    if (!vrrLeg.transportation) {

      console.error("VRR leg is missing a transportation " +
        "and therefore linked journey won´t be processed further: ", JSON.stringify(vrrLeg));
      isValid = false;
    }

    // Check if footpath or "gesicherter Anschluss".
    if (this.isFootpathLeg(vrrLeg) || this.isGesicherterAnschlussLeg(vrrLeg)) {

      console.error("VRR transportation of footpath or \"gesicherter Anschluss\" leg is not supported. " +
        "That should have been detected prior of transportation processing.");
      isValid = false;
    }

    // Check if name/number is missing.
    if (vrrLeg.transportation?.name === undefined
      || (vrrLeg.transportation.number === undefined && vrrLeg.transportation.disassembledName === undefined)) {

      console.error("VRR transportation is missing a proper transportation name " +
        "and therefore linked journey won´t be processed further: " + JSON.stringify(vrrLeg.transportation));
      isValid = false;
    }

    // Check if destination is missing.
    if (vrrLeg.transportation?.destination?.name === undefined
      || vrrLeg.transportation.destination.type === undefined) {

      console.error("VRR transportation is missing a transportation destination " +
        "and therefore linked journey won´t be processed further: " + JSON.stringify(vrrLeg.transportation));
      isValid = false;
    }

    return isValid;
  }

  isTransportationLeg(vrrLeg: VrrLeg): boolean {
    return !this.isFootpathLeg(vrrLeg)
      && !this.isGesicherterAnschlussLeg(vrrLeg);
  }

  isFootpathLeg(vrrLeg: VrrLeg): boolean {
    return vrrLeg.transportation?.product?.name === "footpath";
  }

  isGesicherterAnschlussLeg(vrrLeg: VrrLeg): boolean {
    return vrrLeg.transportation?.product?.name === "gesicherter Anschluss";
  }

  private mapVrrTransportationDestination(vrrTransportationDestination: VrrLocation): TransportationDestination {

    return {
      id: vrrTransportationDestination.id ?? TRANSPORTATION_DESTINATION_ID_FALLBACK_VAL,
      name: vrrTransportationDestination.name,
      type: this.apiService.mapVrrLocationType(vrrTransportationDestination.type)
    } as TransportationDestination;
  }

}
