// Needed to mock private field behaviour.
/* eslint-disable @typescript-eslint/dot-notation */
import { Info, Interchange, JourneyLocationElement, Leg as VrrLeg } from "@oeffis/vrr_client/dist/vendor/VrrApiTypes";
import { Footpath } from "../../../footpath/entity/footpath.entity";
import { FootpathMapperService } from "../../../footpath/service/mapper/footpathMapper.service";
import { LocationCoordinates } from "../../../locationFinder/entity/locationCoordinates.entity";
import {
  LocationCoordinatesMapperService
} from "../../../locationFinder/service/mapper/locationCoordinatesMapper.service";
import { LocationMapperService } from "../../../locationFinder/service/mapper/locationMapper.service";
import { LegInfoPriority } from "../../../vrr/entity/legInfoPriority.entity";
import { LocationType } from "../../../vrr/entity/locationType.entity";
import { ApiService } from "../../../vrr/service/api.service";
import { JourneyLocation } from "../../entity/journeyLocation.entity";
import { LegDetails } from "../../entity/legDetails.entity";
import { LegInfo } from "../../entity/legInfo.entity";
import { JourneyLocationMapperService } from "./journeyLocationMapper.service";
import { LegDetailsMapperService } from "./legDetailsMapper.service";

interface InputOutput<VrrType, MappedType> {
  vrrInput: VrrType,
  mappedOutput: MappedType
}

const LOCATION_COORDINATES: LocationCoordinates = {
  latitude: 51.5,
  longitude: 7.1
};

const JOURNEY_LOCATION: JourneyLocation = {
  id: "de:05513:5613",
  name: "Gelsenkirchen, Hbf",
  type: LocationType.stop,
  details: {
    shortName: "",
    coordinates: LOCATION_COORDINATES,
    parent: { id: "placeID:5513000:9", name: "Gelsenkirchen", type: LocationType.locality, details: {} }
  },
  arrivalTimePlanned: new Date("2023-08-29T17:02:00.000Z"),
  departureTimePlanned: new Date("2023-08-29T17:04:00.000Z")
};

const FOOTPATH: Footpath = {
  totalDuration: 42,
  totalDistance: 42
};

let legDetailsMapper: LegDetailsMapperService;

beforeEach(() => {
  const apiService = new ApiService();
  vi.spyOn(apiService, "mapLegInfoPriority")
    .mockReturnValue(LegInfoPriority.normal);

  const locationCoordinatesMapper = new LocationCoordinatesMapperService();
  vi.spyOn(locationCoordinatesMapper, "checkVrrCoordinatesIntegrity")
    .mockReturnValue(true);
  vi.spyOn(locationCoordinatesMapper, "mapLocationCoordinates")
    .mockReturnValue(LOCATION_COORDINATES);

  const journeyLocationMapper =
    new JourneyLocationMapperService(new LocationMapperService(apiService, locationCoordinatesMapper));
  vi.spyOn(journeyLocationMapper, "checkVrrJourneyLocationIntegrity")
    .mockReturnValue(true);
  vi.spyOn(journeyLocationMapper, "mapJourneyLocations")
    .mockReturnValue([JOURNEY_LOCATION, JOURNEY_LOCATION]);

  const footpathMapper = new FootpathMapperService();
  vi.spyOn(footpathMapper, "mapVrrFootpath")
    .mockReturnValue(FOOTPATH);

  legDetailsMapper =
    new LegDetailsMapperService(
      apiService,
      locationCoordinatesMapper,
      journeyLocationMapper,
      footpathMapper);
});

it.each([
  ["missing duration",
    vrrLegDetails(undefined, [], [{}, {}], undefined, [[12, 42]]), false],
  ["missing stop sequence",
    vrrLegDetails(42, [], undefined, undefined, [[12, 42]]), false],
  ["empty stop sequence",
    vrrLegDetails(42, [], [], undefined, [[12, 42]]), false],
  ["missing coords",
    vrrLegDetails(42, [], [{}, {}], undefined, undefined), false],
  ["empty coords",
    vrrLegDetails(42, [], [{}, {}], undefined, []), false],
  ["valid leg details",
    vrrLegDetails(42, [], [{}, {}], undefined, [[12, 42]]), true]
])("check leg details: %s", (_descr, vrrLeg, expectedResult) => {
  // Given
  // When
  const checkResult = legDetailsMapper.checkVrrLegDetailsIntegrity(vrrLeg);

  // Then
  expect(checkResult).toBe(expectedResult);
});

it.each([
  { validCoordinates: false, result: false },
  { validCoordinates: true, result: true }
])("process mappers' result ($validCoordinates).", ({ validCoordinates, result }) => {
  // Given
  const leg: VrrLeg = vrrLegDetails(42, [], [{}, {}], undefined, [[12, 42]]);

  vi.spyOn(legDetailsMapper["locationCoordinatesMapper"], "checkVrrCoordinatesIntegrity")
    .mockReturnValueOnce(validCoordinates);

  // When
  const checkResult = legDetailsMapper.checkVrrLegDetailsIntegrity(leg);

  // Then
  expect(checkResult).toBe(result);
});

it("map leg details with all fields given.", () => {
  // Given
  const vrrLeg: VrrLeg = vrrLegDetails(
    120,
    [vrrLegInfo1().vrrInput, vrrLegInfo2().vrrInput],
    [{}, {}],
    vrrInterchange(),
    [[5273646.26611, 777515.18019], [5273607.38463, 777504.56031], [5273023.51303, 777340.0635]]
  );

  const expectedLegDetails: LegDetails = {
    duration: 120,
    infos: [vrrLegInfo1().mappedOutput, vrrLegInfo2().mappedOutput],
    stopSequence: [JOURNEY_LOCATION, JOURNEY_LOCATION],
    interchange: { footpath: FOOTPATH },
    coords: [
      LOCATION_COORDINATES,
      LOCATION_COORDINATES,
      LOCATION_COORDINATES
    ]
  } as LegDetails;

  // When
  const mappedLegDetails = legDetailsMapper.mapVrrLegDetails(vrrLeg);

  // Then
  expect(mappedLegDetails).toEqual(expectedLegDetails);
});

it("map leg details with missing optional fields.", () => {
  // Given
  const vrrLeg: VrrLeg = vrrLegDetails(
    120,
    undefined,
    [{}, {}],
    undefined,
    [[5273646.26611, 777515.18019], [5273607.38463, 777504.56031], [5273023.51303, 777340.0635]]
  );

  const expectedLegDetails: LegDetails = {
    duration: 120,
    infos: [],
    stopSequence: [JOURNEY_LOCATION, JOURNEY_LOCATION],
    interchange: undefined,
    coords: [
      LOCATION_COORDINATES,
      LOCATION_COORDINATES,
      LOCATION_COORDINATES
    ]
  } as LegDetails;

  // When
  const mappedLegDetails = legDetailsMapper.mapVrrLegDetails(vrrLeg);

  // Then
  expect(mappedLegDetails).toEqual(expectedLegDetails);
});

it("throw error if invalid transportation.", () => {
  // Given
  const vrrLegDetailsWithoutDuration: VrrLeg =
    vrrLegDetails(undefined, [], [{}, {}], undefined,
      [[5273646.26611, 777515.18019], [5273607.38463, 777504.56031], [5273023.51303, 777340.0635]]);

  // When & Then
  expect(() => legDetailsMapper.mapVrrLegDetails(vrrLegDetailsWithoutDuration))
    .toThrowError("leg has no valid details");
});

function vrrLegDetails(
  duration?: number,
  infos?: Info[],
  stopSequence?: JourneyLocationElement[],
  interchange?: Interchange,
  coords?: number[][]
): VrrLeg {

  return {
    duration: duration,
    infos: infos,
    stopSequence: stopSequence,
    interchange: interchange,
    coords: coords
  } as VrrLeg;
}

function vrrInterchange(): Interchange {

  return {
    desc: "Fussweg",
    type: 100,
    coords: [
      [5287633.53257, 761928.78169],
      [5287633, 761929],
      [5287628, 761928]
    ]
  } as Interchange;
}

function vrrLegInfo1(): InputOutput<Info, LegInfo> {
  const vrrLegInfo: Info = {
    priority: "normal",
    id: "ems-14363",
    version: 54,
    type: "lineInfo",
    urlText: "Linien 253, 253E, TB253 - Haltestellenausfälle - (H) Gladbeck, Paul-Löbe-Str. - Grund: Baumaßnahme",
    url: "http://ems.vrr.de/info-link/3d6d3916-d219-5c50-8bd2-e7c5184eb1cc",
    content: "<b>Linien 253, 253E und TB253: " +
      "</b>An der <b>(H) Gladbeck, Paul-Löbe-Str.</b> kommt es zu <b>Haltestellenausfällen</b>.<br><br> " +
      "Dauer: Bis auf Weiteres<br><br>Die Haltestellen werden nicht angefahren. (...)",
    subtitle: "Haltestellenausfälle durch Baumaßnahme",
    title: "Haltestellenausfälle durch Baumaßnahme",
    additionalText: "Die Änderungen sind in der elektronischen Fahrplanauskunft (EFA) <b>nicht</b> berücksichtigt.",
    properties: {
      publisher: "ems.comm.addinfo",
      infoType: "lineInfo",
      incidentDateTime: "28/08/2023 09:00 - 31/12/2500 01:00",
      smsText: "Linien 253, 253E, TB253 - Haltestellenausfälle - (H) Gladbeck, Paul-Löbe-Str. - Grund: Baumaßnahme"
    }
  };

  const expectedMappedLegInfo: LegInfo = {
    priority: LegInfoPriority.normal,
    validity: { from: new Date("2023-08-28T09:00:00.000Z"), to: new Date("2500-12-31T01:00:00.000Z") },
    title: "Haltestellenausfälle durch Baumaßnahme",
    content: "<b>Linien 253, 253E und TB253: " +
      "</b>An der <b>(H) Gladbeck, Paul-Löbe-Str.</b> kommt es zu <b>Haltestellenausfällen</b>.<br><br> " +
      "Dauer: Bis auf Weiteres<br><br>Die Haltestellen werden nicht angefahren. (...)<br><br>" +
      "Die Änderungen sind in der elektronischen Fahrplanauskunft (EFA) <b>nicht</b> berücksichtigt.",
    sourceUrl: "http://ems.vrr.de/info-link/3d6d3916-d219-5c50-8bd2-e7c5184eb1cc",
    additionalLinks: []
  };

  return {
    vrrInput: vrrLegInfo,
    mappedOutput: expectedMappedLegInfo
  };
}

function vrrLegInfo2(): InputOutput<Info, LegInfo> {
  const vrrLegInfo: Info = {
    priority: "veryHigh",
    id: "ZTP-PROD-90459",
    version: 1695973229,
    type: "tripMessage",
    urlText: "",
    url: "http://ems.vrr.de/info-link/acfa9f2e-f08d-5c87-a270-4143a1028d71",
    content: "RE 3: Die Züge fallen zw. Oberhausen Hbf - Düsseldorf Hbf aus.<br><br>" +
      "RE 19: Die Züge werden ab Oberhausen-Sterkrade ohne Zwischenhalt bis Düsseldorf Hbf umgeleitet. " +
      "Es kommt zu Verspätungen in beide Richtungen. (...)",
    subtitle: "Besonderer Untertitel",
    title: "RE 3 / RE 19 / RB 35 / RE 44: Maßnahmen und Fahrpläne",
    properties: {
      publisher: "ems.comm.addinfo",
      infoType: "tripMessage",
      incidentDateTime: "29/09/2023 20:00 - 13/10/2023 23:00",
      additionalLinks: [
        {
          id: "-1",
          url: "https://www.zuginfo.nrw/download/1695651930842_1694599349397_Ersatzfahrplan_SEV0_RE3_RE5RRX_RE19_RE44_RB32_RB35_29_09_2023_13_10_2023.pdf",
          urlText: "Ersatzfahrplan RE 3 / RE 19 / RB 35 / RE 44",
          subtitle: ""
        },
        {
          id: "-1",
          url: "https://www.zuginfo.nrw/download/1695923732168_Kundenfahrplan-BM-32858-RB35.pdf",
          urlText: "Ersatzfahrplan RB 35 (29.09.2023 21:00 Uhr - 13.10.2023)",
          subtitle: ""
        }
      ]
    }
  };

  const expectedMappedLegInfo: LegInfo = {
    priority: LegInfoPriority.normal,
    validity: { from: new Date("2023-09-29T20:00:00.000Z"), to: new Date("2023-10-13T23:00:00.000Z") },
    title: "RE 3 / RE 19 / RB 35 / RE 44: Maßnahmen und Fahrpläne\n" + "Besonderer Untertitel",
    content: "RE 3: Die Züge fallen zw. Oberhausen Hbf - Düsseldorf Hbf aus.<br><br>" +
      "RE 19: Die Züge werden ab Oberhausen-Sterkrade ohne Zwischenhalt bis Düsseldorf Hbf umgeleitet. " +
      "Es kommt zu Verspätungen in beide Richtungen. (...)",
    sourceUrl: "http://ems.vrr.de/info-link/acfa9f2e-f08d-5c87-a270-4143a1028d71",
    additionalLinks: [
      "https://www.zuginfo.nrw/download/1695651930842_1694599349397_Ersatzfahrplan_SEV0_RE3_RE5RRX_RE19_RE44_RB32_RB35_29_09_2023_13_10_2023.pdf",
      "https://www.zuginfo.nrw/download/1695923732168_Kundenfahrplan-BM-32858-RB35.pdf"
    ]
  };

  return {
    vrrInput: vrrLegInfo,
    mappedOutput: expectedMappedLegInfo
  };
}
