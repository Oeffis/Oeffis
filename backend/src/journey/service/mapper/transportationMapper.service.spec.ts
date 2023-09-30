import {
  Leg as VrrLeg,
  Location as VrrLocation,
  LocationType as VrrLocationType
} from "@oeffis/vrr_client/dist/vendor/VrrApiTypes";
import { LocationType } from "../../../vrr/entity/locationType.entity";
import { ApiService } from "../../../vrr/service/api.service";
import { Transportation, TransportationDestination } from "../../entity/transportation.entity";
import { TransportationMapperService } from "./transportationMapper.service";

let transportationMapper: TransportationMapperService;

beforeEach(() => {
  const apiService = new ApiService();
  vi.spyOn(apiService, "mapVrrLocationType")
    .mockImplementation((vrrLocation) =>
      vrrLocation === VrrLocationType.Stop
        ? LocationType.stop
        : LocationType.unknown);

  transportationMapper = new TransportationMapperService(apiService);
});

it.each([
  ["missing transportation", { transportation: undefined } as VrrLeg, false],
  ["footpath transportation", vrrLegTransportationFootpath(), false],
  ["\"gesicherter Anschluss\" transportation", vrrLegTransportationGesicherterAnschluss(), false],
  ["missing name", vrrLegTransportation("", undefined, "", "",
    vrrLegTransportationDestination("", "", VrrLocationType.Unknown),
    "", []), false],
  ["missing number+disassembledName", vrrLegTransportation("", "", undefined, undefined,
    vrrLegTransportationDestination("", "", VrrLocationType.Unknown),
    "", []), false],
  ["missing number but disassembledName", vrrLegTransportation("", "", "", undefined,
    vrrLegTransportationDestination("", "", VrrLocationType.Unknown),
    "", []), true],
  ["missing destination", vrrLegTransportation("", "", "", "",
    undefined, "", []), false],
  ["missing destination name", vrrLegTransportation("", "", "", "",
    vrrLegTransportationDestination("", undefined, VrrLocationType.Unknown),
    "", []), false],
  ["missing destination type", vrrLegTransportation("", "", "", "",
    vrrLegTransportationDestination("", "", undefined),
    "", []), false],
  ["valid transportation", vrrLegTransportation("", "", "", "",
    vrrLegTransportationDestination("", "", VrrLocationType.Unknown),
    "", []), true]
])("check transportation: %s", (_descr, vrrLeg, expectedResult) => {
  // Given
  // When
  const checkResult = transportationMapper.checkVrrTransportationIntegrity(vrrLeg);

  // Then
  expect(checkResult).toBe(expectedResult);
});

it.each([
  ["default", vrrLegTransportationStub(), true],
  ["footpath", vrrLegTransportationFootpath(), false],
  ["gesicherter Anschluss", vrrLegTransportationGesicherterAnschluss(), false]
])("check if transportation leg (%s).", (_descr, vrrLeg, expectedResult) => {
  // Given
  // When
  const checkResult = transportationMapper.isTransportationLeg(vrrLeg);

  // Then
  expect(checkResult).toBe(expectedResult);
});

it.each([
  ["default", vrrLegTransportationStub(), false],
  ["footpath", vrrLegTransportationFootpath(), true],
  ["gesicherter Anschluss", vrrLegTransportationGesicherterAnschluss(), false]
])("check if footpath leg (%s).", (_descr, vrrLeg, expectedResult) => {
  // Given
  // When
  const checkResult = transportationMapper.isFootpathLeg(vrrLeg);

  // Then
  expect(checkResult).toBe(expectedResult);
});

it.each([
  ["default", vrrLegTransportationStub(), false],
  ["footpath", vrrLegTransportationFootpath(), false],
  ["gesicherter Anschluss", vrrLegTransportationGesicherterAnschluss(), true]
])("check if \"gesicherter Anschluss\" leg (%s).", (_descr, vrrLeg, expectedResult) => {
  // Given
  // When
  const checkResult = transportationMapper.isGesicherterAnschlussLeg(vrrLeg);

  // Then
  expect(checkResult).toBe(expectedResult);
});

it("map transportation with all fields given.", () => {
  // Given
  const vrrLeg: VrrLeg = vrrLegTransportation(
    "ddb:90E43: :R:j23", "Regionalzug RB43", "RB43", "RB43",
    vrrLegTransportationDestination("20003868", "Dorsten Bf", VrrLocationType.Stop),
    "DB Regio AG NRW", [
      "Linie RB43: Fahrradmitnahme begrenzt möglich",
      "Linie RB43: Fahrzeuggebundene Einstiegshilfe vorhanden",
      "Linie RB43: rollstuhltaugliches WC"]);

  const expectedTransportation: Transportation = {
    id: "ddb:90E43: :R:j23",
    name: "Regionalzug RB43",
    line: "RB43",
    destination: { id: "20003868", name: "Dorsten Bf", type: LocationType.stop } as TransportationDestination,
    operator: "DB Regio AG NRW",
    hints: [
      "Linie RB43: Fahrradmitnahme begrenzt möglich",
      "Linie RB43: Fahrzeuggebundene Einstiegshilfe vorhanden",
      "Linie RB43: rollstuhltaugliches WC"
    ]
  } as Transportation;

  // When
  const mappedTransportation = transportationMapper.mapVrrTransportation(vrrLeg);

  // Then
  expect(mappedTransportation).toEqual(expectedTransportation);
});

it("map transportation with missing optional fields.", () => {
  // Given
  const vrrLeg: VrrLeg = vrrLegTransportation(
    undefined, "Regionalzug RB43", undefined, "RB43",
    vrrLegTransportationDestination(undefined, "Dorsten Bf", VrrLocationType.Stop),
    undefined, undefined);

  const expectedTransportation: Transportation = {
    id: "",
    name: "Regionalzug RB43",
    line: "RB43",
    destination: { id: "", name: "Dorsten Bf", type: LocationType.stop } as TransportationDestination,
    operator: "",
    hints: []
  } as Transportation;

  // When
  const mappedTransportation = transportationMapper.mapVrrTransportation(vrrLeg);

  // Then
  expect(mappedTransportation).toEqual(expectedTransportation);
});

it("map transportation with missing number but disassembledName.", () => {
  // Given
  const vrrLeg: VrrLeg = vrrLegTransportation(
    undefined, "Regionalzug RB43", "RB43", undefined,
    vrrLegTransportationDestination(undefined, "Dorsten Bf", VrrLocationType.Stop),
    undefined, undefined);

  const expectedTransportation: Transportation = {
    id: "",
    name: "Regionalzug RB43",
    line: "RB43",
    destination: { id: "", name: "Dorsten Bf", type: LocationType.stop } as TransportationDestination,
    operator: "",
    hints: []
  } as Transportation;

  // When
  const mappedTransportation = transportationMapper.mapVrrTransportation(vrrLeg);

  // Then
  expect(mappedTransportation).toEqual(expectedTransportation);
});

it("throw error if invalid transportation.", () => {
  // Given
  const vrrLegWithoutTransportationNameAndNumber: VrrLeg = vrrLegTransportation();

  // When & Then
  expect(() => transportationMapper.mapVrrTransportation(vrrLegWithoutTransportationNameAndNumber))
    .toThrowError("leg has no valid transportation");
});

function vrrLegTransportation(
  id?: string,
  name?: string,
  disassembledName?: string,
  number?: string,
  destination?: VrrLocation,
  operator?: string,
  hints?: string[]
): VrrLeg {

  return {
    hints: hints,
    transportation: {
      id: id,
      name: name,
      disassembledName: disassembledName,
      number: number,
      destination: destination,
      operator: {
        id: "someId",
        name: operator,
        code: "someCode"
      },
      product: {
        id: 13,
        class: 5,
        name: "Niederflurblus",
        iconId: 5
      }
    }
  } as VrrLeg;
}

function vrrLegTransportationStub(): VrrLeg {

  return {
    hints: [],
    transportation: {
      id: "",
      name: "",
      disassembledName: "",
      number: "",
      destination: {
        id: "",
        name: "",
        type: VrrLocationType.Unknown
      },
      operator: {
        id: "",
        name: "",
        code: ""
      },
      product: {
        id: 13,
        class: 5,
        name: "Niederflurblus",
        iconId: 5
      }
    }
  } as VrrLeg;
}

function vrrLegTransportationFootpath(): VrrLeg {

  return {
    transportation: {
      product: {
        class: 99,
        name: "footpath",
        iconId: 99
      }
    }
  } as VrrLeg;
}

function vrrLegTransportationGesicherterAnschluss(): VrrLeg {

  return {
    transportation: {
      product: {
        name: "gesicherter Anschluss",
        iconId: 98
      }
    }
  } as VrrLeg;
}

function vrrLegTransportationDestination(
  id?: string,
  name?: string,
  type?: VrrLocationType
): VrrLocation {

  return {
    id: id,
    name: name,
    type: type
  } as VrrLocation;
}
