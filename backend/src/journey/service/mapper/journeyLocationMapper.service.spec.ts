// Needed to mock private field behaviour.
/* eslint-disable @typescript-eslint/dot-notation */
import {
  JourneyLocationElement as VrrJourneyLocation,
  Location as VrrLocation,
  LocationType as VrrLocationType
} from "@oeffis/vrr_client/dist/vendor/VrrApiTypes";
import { Location } from "../../../locationFinder/entity/location.entity";
import {
  LocationCoordinatesMapperService
} from "../../../locationFinder/service/mapper/locationCoordinatesMapper.service";
import { LocationMapperService } from "../../../locationFinder/service/mapper/locationMapper.service";
import { LocationType } from "../../../vrr/entity/locationType.entity";
import { ApiService } from "../../../vrr/service/api.service";
import { JourneyLocation, LegDestinationLocation, LegOriginLocation } from "../../entity/journeyLocation.entity";
import { JourneyLocationMapperService } from "./journeyLocationMapper.service";

const BASE_LOCATION = {
  id: "de:05513:5613",
  name: "Gelsenkirchen, Hbf",
  type: LocationType.stop,
  details: {
    shortName: "Hbf",
    coordinates: { latitude: 51.50, longitude: 7.10 },
    parent: { id: "placeID:5513000:9", name: "Gelsenkirchen", type: LocationType.locality, details: {} }
  }
} as Location;

let journeyLocationMapper: JourneyLocationMapperService;

beforeEach(() => {
  const locationMapper =
    new LocationMapperService(new ApiService(), new LocationCoordinatesMapperService());
  vi.spyOn(locationMapper, "checkVrrLocationIntegrity")
    .mockReturnValue(true);
  vi.spyOn(locationMapper, "mapVrrLocation")
    .mockReturnValue(BASE_LOCATION);

  journeyLocationMapper = new JourneyLocationMapperService(locationMapper);
});

it.each([
  ["missing arrival and departure time", vrrJourneyLocation(), false],
  ["valid locations", vrrJourneyLocation("2023-08-29T16:58:00.000Z", "2023-08-29T16:58:00.000Z"), true]
])("check journey location: %s", (_descr, vrrJourneyLocation, expectedResult) => {
  // Given
  // When
  const checkResult = journeyLocationMapper.checkVrrJourneyLocationIntegrity(vrrJourneyLocation);
  // Then
  expect(checkResult).toBe(expectedResult);
});

it.each([
  ["missing planned and estimated time",
    vrrLegOriginLocation(), false],
  ["missing planned time",
    vrrLegOriginLocation(undefined, "2023-08-29T16:58:30.000Z"), false],
  ["missing estimated time",
    vrrLegOriginLocation("2023-08-29T16:58:30.000Z", undefined), true],
  ["all fields given",
    vrrLegOriginLocation("2023-08-29T16:58:30.000Z", "2023-08-29T16:58:30.000Z"), true]
])("check leg origin location: %s", (_descr, vrrOriginLocation, expectedResult) => {
  // Given
  // When
  const checkResult = journeyLocationMapper.checkVrrLegOriginLocationIntegrity(vrrOriginLocation);

  // Then
  expect(checkResult).toBe(expectedResult);
});

it.each([
  ["missing planned and estimated time",
    vrrLegDestinationLocation(), false],
  ["missing planned time",
    vrrLegDestinationLocation(undefined, "2023-08-29T16:58:30.000Z"), false],
  ["missing estimated time",
    vrrLegDestinationLocation("2023-08-29T16:58:30.000Z", undefined), true],
  ["all fields given",
    vrrLegDestinationLocation("2023-08-29T16:58:30.000Z", "2023-08-29T16:58:30.000Z"), true]
])("check leg destination location: %s", (_descr, vrrDestinationLocation, expectedResult) => {
  // Given
  // When
  const checkResult = journeyLocationMapper.checkVrrLegDestinationLocationIntegrity(vrrDestinationLocation);

  // Then
  expect(checkResult).toBe(expectedResult);
});

it.each([
  { validLocation: false, result: false },
  { validLocation: true, result: true }
])("process mappers' result ($validLocation).", ({ validLocation, result }) => {
  // Given
  const journeyLocation = vrrJourneyLocation("2023-08-29T16:58:00.000Z", "2023-08-29T16:59:00.000Z");
  const legOriginLocation: VrrLocation =
    vrrLegOriginLocation("2023-08-29T16:58:00.000Z", "2023-08-29T16:59:00.000Z");
  const legDestinationLocation: VrrLocation =
    vrrLegDestinationLocation("2023-08-29T16:58:00.000Z", "2023-08-29T16:59:00.000Z");

  // When
  vi.spyOn(journeyLocationMapper["locationMapper"], "checkVrrLocationIntegrity")
    .mockReturnValueOnce(validLocation);
  const checkResult = journeyLocationMapper.checkVrrJourneyLocationIntegrity(journeyLocation);

  vi.spyOn(journeyLocationMapper["locationMapper"], "checkVrrLocationIntegrity")
    .mockReturnValueOnce(validLocation);
  const checkResult2 =
    journeyLocationMapper.checkVrrLegOriginLocationIntegrity(legOriginLocation);

  vi.spyOn(journeyLocationMapper["locationMapper"], "checkVrrLocationIntegrity")
    .mockReturnValueOnce(validLocation);
  const checkResult3 =
    journeyLocationMapper.checkVrrLegDestinationLocationIntegrity(legDestinationLocation);

  // Then
  expect(checkResult).toBe(result);
  expect(checkResult2).toBe(result);
  expect(checkResult3).toBe(result);
});

it("map vrr journey locations with all fields given.", () => {
  // Given
  const vrrJourneyLocations: VrrJourneyLocation[] = [
    vrrJourneyLocation("2023-08-29T16:58:00.000Z", "2023-08-29T16:59:00.000Z"),
    vrrJourneyLocation("2023-08-28T16:58:00.000Z", "2023-08-28T16:58:30.000Z")
  ];

  const expectedJourneyLocations: JourneyLocation[] = [
    {
      ...BASE_LOCATION,
      arrivalTimePlanned: new Date("2023-08-29T16:58:00.000Z"),
      departureTimePlanned: new Date("2023-08-29T16:59:00.000Z")
    } as JourneyLocation,
    {
      ...BASE_LOCATION,
      arrivalTimePlanned: new Date("2023-08-28T16:58:00.000Z"),
      departureTimePlanned: new Date("2023-08-28T16:58:30.000Z")
    } as JourneyLocation
  ];

  // When
  const mappedJourneyLocations = journeyLocationMapper.mapJourneyLocations(vrrJourneyLocations);

  // Then
  expect(mappedJourneyLocations).toEqual(expectedJourneyLocations);
});

it.each([
  ["missing arrivalTime", vrrJourneyLocation(undefined, "2023-08-28T16:58:30.000Z")],
  ["missing departureTime", vrrJourneyLocation("2023-08-28T16:58:30.000Z", undefined)]
])("map vrr journey locations with missing optional fields (%s).", (_descr, vrrJourneyLocation) => {
  // Given
  const expectedJourneyLocations: JourneyLocation[] = [
    ({
      ...BASE_LOCATION,
      arrivalTimePlanned: new Date("2023-08-28T16:58:30.000Z"),
      departureTimePlanned: new Date("2023-08-28T16:58:30.000Z")
    } as JourneyLocation)
  ];

  // When
  const mappedJourneyLocations =
    journeyLocationMapper.mapJourneyLocations([vrrJourneyLocation]);

  // Then
  expect(mappedJourneyLocations).toEqual(expectedJourneyLocations);
});

it("filters out locations without departure and arrival time", () => {
  // Given
  const sampleLocations = [
    vrrJourneyLocation("2023-08-29T16:58:00.000Z", "2023-08-29T16:59:00.000Z"),
    vrrJourneyLocation()
  ];

  // When
  const mappedLocations = journeyLocationMapper.mapJourneyLocations(sampleLocations);

  // Then
  expect(mappedLocations.length).toBe(1);
  expect(mappedLocations[0].arrivalTimePlanned.toISOString()).toBe("2023-08-29T16:58:00.000Z");
});

it("map vrr leg origin with all fields given.", () => {
  // Given
  const vrrLegOrigin: VrrJourneyLocation =
    vrrLegOriginLocation("2023-08-28T16:58:00.000Z", "2023-08-28T16:58:30.000Z");

  const expectedLegOrigin: LegOriginLocation = {
    ...BASE_LOCATION,
    departureTimePlanned: new Date("2023-08-28T16:58:00.000Z"),
    departureTimeEstimated: new Date("2023-08-28T16:58:30.000Z")
  };

  // When
  const mappedLegOriginLocation = journeyLocationMapper.mapLegOriginLocation(vrrLegOrigin);

  // Then
  expect(mappedLegOriginLocation).toEqual(expectedLegOrigin);
});

it("map vrr leg origin with missing optional fields.", () => {
  // Given
  const vrrLegOriginWithoutEstimated: VrrJourneyLocation =
    vrrLegOriginLocation("2023-08-28T16:58:00.000Z", undefined);

  const expectedLegOrigin: LegOriginLocation = {
    ...BASE_LOCATION,
    departureTimePlanned: new Date("2023-08-28T16:58:00.000Z"),
    departureTimeEstimated: new Date("2023-08-28T16:58:00.000Z")
  };

  // When
  const mappedLegOriginLocation =
    journeyLocationMapper.mapLegOriginLocation(vrrLegOriginWithoutEstimated);

  // Then
  expect(mappedLegOriginLocation).toEqual(expectedLegOrigin);
});

it("throw error if invalid leg origin.", () => {
  // Given
  const vrrLegOriginWithoutPlanned: VrrJourneyLocation = vrrLegOriginLocation();

  // When & Then
  expect(() => journeyLocationMapper.mapLegOriginLocation(vrrLegOriginWithoutPlanned))
    .toThrowError("missing planned departure time");
});

it("map vrr leg destination with all fields given.", () => {
  // Given
  const vrrLegDestination: VrrJourneyLocation =
    vrrLegDestinationLocation("2023-08-28T16:58:00.000Z", "2023-08-28T16:58:30.000Z");

  const expectedLegDestination: LegDestinationLocation = {
    ...BASE_LOCATION,
    arrivalTimePlanned: new Date("2023-08-28T16:58:00.000Z"),
    arrivalTimeEstimated: new Date("2023-08-28T16:58:30.000Z")
  };

  // When
  const mappedLegDestinationLocation =
    journeyLocationMapper.mapLegDestinationLocation(vrrLegDestination);

  // Then
  expect(mappedLegDestinationLocation).toEqual(expectedLegDestination);
});

it("map vrr leg destination with missing optional fields.", () => {
  // Given
  const vrrLegDestinationWithoutEstimated: VrrJourneyLocation =
    vrrLegDestinationLocation("2023-08-28T16:58:00.000Z", undefined);

  const expectedLegDestination: LegDestinationLocation = {
    ...BASE_LOCATION,
    arrivalTimePlanned: new Date("2023-08-28T16:58:00.000Z"),
    arrivalTimeEstimated: new Date("2023-08-28T16:58:00.000Z")
  };

  // When
  const mappedLegDestinationLocation =
    journeyLocationMapper.mapLegDestinationLocation(vrrLegDestinationWithoutEstimated);

  // Then
  expect(mappedLegDestinationLocation).toEqual(expectedLegDestination);
});

it("throw error if invalid leg destination.", () => {
  // Given
  const vrrLegDestinationWithoutPlanned: VrrJourneyLocation = vrrLegDestinationLocation();

  // When & Then
  expect(() => journeyLocationMapper.mapLegDestinationLocation(vrrLegDestinationWithoutPlanned))
    .toThrowError("missing planned arrival time");
});

function vrrJourneyLocation(
  arrivalPlanned?: string,
  departurePlanned?: string
): VrrJourneyLocation {

  return {
    ...vrrLocation(),
    arrivalTimePlanned: arrivalPlanned,
    arrivalTimeEstimated: undefined,
    departureTimePlanned: departurePlanned,
    departureTimeEstimated: undefined
  } as VrrJourneyLocation;
}

function vrrLegOriginLocation(
  departurePlanned?: string,
  departureEstimated?: string
): VrrJourneyLocation {

  return {
    ...vrrLocation(),
    departureTimePlanned: departurePlanned,
    departureTimeEstimated: departureEstimated
  } as VrrJourneyLocation;
}

function vrrLegDestinationLocation(
  arrivalPlanned?: string,
  arrivalEstimated?: string
): VrrJourneyLocation {

  return {
    ...vrrLocation(),
    arrivalTimePlanned: arrivalPlanned,
    arrivalTimeEstimated: arrivalEstimated
  } as VrrJourneyLocation;
}

function vrrLocation(): VrrLocation {

  return {
    id: "de:05513:5613",
    name: "Gelsenkirchen, Hbf",
    type: VrrLocationType.Stop,
    disassembledName: "Hbf",
    coord: [51.50, 7.10],
    parent: {
      id: "placeID:5513000:9",
      name: "Gelsenkirchen",
      type: VrrLocationType.Locality
    }
  } as VrrLocation;
}
