import { Info as VrrInfo, Leg as VrrLeg } from "@oeffis/vrr_client/dist/vendor/VrrApiTypes";
import { parse } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import { FootpathMapperService } from "../../../footpath/service/mapper/footpathMapper.service";
import {
  LocationCoordinatesMapperService
} from "../../../locationFinder/service/mapper/locationCoordinatesMapper.service";
import { ApiService } from "../../../vrr/service/api.service";
import { LegDetails } from "../../entity/legDetails.entity";
import { LegInfo, LegInfoValidity } from "../../entity/legInfo.entity";
import { LegInterchange } from "../../entity/legInterchange.entity";
import { JourneyLocationMapperService } from "./journeyLocationMapper.service";

const LEG_INFOS_FALLBACK_VAL: LegInfo[] = [];
const LEG_INFO_TITLE_FALLBACK_VAL = "";
const LEG_INFO_CONTENT_FALLBACK_VAL = "";
const LEG_INFO_URL_FALLBACK_VAL = "";
const LEG_INFO_ADDITIONAL_LINKS_FALLBACK_VAL: string[] = [];
const LEG_INTERCHANGE_FALLBACK_VAL = undefined;

/**
 * Service to transfer some other-typed leg details to leg details of custom type {@link LegDetails}.
 */
export class LegDetailsMapperService {

  private readonly apiService: ApiService;
  private readonly locationCoordinatesMapper: LocationCoordinatesMapperService;
  private readonly journeyLocationMapper: JourneyLocationMapperService;
  private readonly footpathMapper: FootpathMapperService;

  constructor(
    apiService: ApiService,
    locationCoordinatesMapper: LocationCoordinatesMapperService,
    journeyLocationMapper: JourneyLocationMapperService,
    footpathMapper: FootpathMapperService
  ) {
    this.apiService = apiService;
    this.locationCoordinatesMapper = locationCoordinatesMapper;
    this.journeyLocationMapper = journeyLocationMapper;
    this.footpathMapper = footpathMapper;
  }

  /**
   * Maps leg details of given VRR leg ({@link VrrLeg}) to custom leg details ({@link LegDetails}).
   *
   * @param vrrLeg VRR leg with transportation
   */
  mapVrrLegDetails(vrrLeg: VrrLeg): LegDetails {
    if (!this.checkVrrLegDetailsIntegrity(vrrLeg)) {
      throw new Error("Given leg has no valid details. Mapping is not possible.\n" + JSON.stringify(vrrLeg));
    }

    // Presence of stop sequence is ensured above in check.
    return {
      duration: vrrLeg.duration,
      infos: this.mapLegInfos(vrrLeg.infos) ?? LEG_INFOS_FALLBACK_VAL,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      stopSequence: this.journeyLocationMapper.mapJourneyLocations(vrrLeg.stopSequence!),
      interchange: this.mapLegInterchange(vrrLeg) ?? LEG_INTERCHANGE_FALLBACK_VAL,
      coords: vrrLeg.coords
        ?.map(coords => this.locationCoordinatesMapper.mapLocationCoordinates(coords))
    } as LegDetails;
  }

  /**
   * Checks if given VRR leg details are present and complete or if there is something missing to map them properly.
   *
   * @param vrrLeg VRR leg details to check
   */
  checkVrrLegDetailsIntegrity(vrrLeg: VrrLeg): boolean {
    let isValid = true;

    // Check if duration is given.
    if (!vrrLeg.duration) {

      console.error("VRR leg is missing its duration " +
        "and therefore linked journey won´t be processed further: " + JSON.stringify(vrrLeg));
      isValid = false;
    }

    // Check if stop sequence is given.
    if (!vrrLeg.stopSequence || vrrLeg.stopSequence.length === 0) {

      console.error("VRR leg is missing its stop sequence " +
        "and therefore linked journey won´t be processed further: " + JSON.stringify(vrrLeg));
      isValid = false;
    }

    // Check if coordinates are given.
    if (!vrrLeg.coords || vrrLeg.coords.length === 0) {

      console.error("VRR leg is missing its coordinates " +
        "and therefore linked journey won´t be processed further: " + JSON.stringify(vrrLeg));
      isValid = false;
    }

    // Check if correct coordinates format.
    if (!vrrLeg.coords?.every(coord => this.locationCoordinatesMapper.checkVrrCoordinatesIntegrity(coord))) {

      console.error("(Some of) VRR leg coordinates have an unsupported format " +
        "and therefore linked journey won´t be processed further: " + JSON.stringify(vrrLeg));
      isValid = false;
    }

    return isValid;
  }

  private mapLegInfos(vrrLegInfos: VrrInfo[] | undefined): LegInfo[] | undefined {
    if (!vrrLegInfos) {
      return undefined;
    }

    return vrrLegInfos.map(info => {
      let mergedTitles = info.title ?? LEG_INFO_TITLE_FALLBACK_VAL;
      if (info.subtitle && info.title !== info.subtitle) {

        mergedTitles += "\n" + info.subtitle;
      }
      let mergedContent = info.content ?? LEG_INFO_CONTENT_FALLBACK_VAL;
      if (info.additionalText) {
        mergedContent += "<br><br>" + info.additionalText;
      }

      return {
        priority: this.apiService.mapLegInfoPriority(info.priority),
        validity: this.mapLegInfoValidity(info),
        title: mergedTitles,
        content: mergedContent,
        sourceUrl: info.url ?? LEG_INFO_URL_FALLBACK_VAL,
        additionalLinks: info.properties?.additionalLinks
          ?.map(link => link.url) ?? LEG_INFO_ADDITIONAL_LINKS_FALLBACK_VAL
      } as LegInfo;
    });
  }

  private mapLegInfoValidity(vrrLegInfo: VrrInfo): LegInfoValidity {
    // Property "incidentDateTime" is not specified but present always.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    const [fromDateString, toDateString] = vrrLegInfo.properties?.incidentDateTime.split(" - ") as string[];

    return {
      // Interpret dates as zoned already.
      from: zonedTimeToUtc(parse(fromDateString, "dd/MM/yyyy HH:mm", new Date()), "UTC"),
      to: zonedTimeToUtc(parse(toDateString, "dd/MM/yyyy HH:mm", new Date()), "UTC")
    } as LegInfoValidity;
  }

  private mapLegInterchange(vrrLeg: VrrLeg): LegInterchange | undefined {
    if (!vrrLeg.interchange) {
      return undefined;
    }

    return {
      footpath: this.footpathMapper.mapVrrFootpath(vrrLeg)
    } as LegInterchange;
  }

}
