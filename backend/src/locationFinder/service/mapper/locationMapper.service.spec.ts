// Needed to mock private field behaviour.
/* eslint-disable @typescript-eslint/dot-notation */
import { Location as VrrLocation, LocationType as VrrLocationType } from "@oeffis/vrr_client/dist/vendor/VrrApiTypes";
import { LocationType } from "../../../vrr/entity/locationType.entity";
import { ApiService } from "../../../vrr/service/api.service";
import { Location, LocationWithAssignedStops, RatedLocation } from "../../entity/location.entity";
import { LocationDetails } from "../../entity/locationDetails.entity";
import { LocationCoordinatesMapperService } from "./locationCoordinatesMapper.service";
import { LocationMapperService } from "./locationMapper.service";

const LOCATION_DETAILS: LocationDetails = {
  shortName: "",
  coordinates: { latitude: 51.50, longitude: 7.10 },
  parent: { id: "placeID:5513000:9", name: "Gelsenkirchen", type: LocationType.locality, details: {} }
};

let mapper: LocationMapperService;

beforeEach(() => {
  const apiService = new ApiService();
  vi.spyOn(apiService, "mapVrrLocationType")
    .mockImplementation((vrrLocation) =>
      vrrLocation === VrrLocationType.Stop
        ? LocationType.stop
        : LocationType.unknown);

  const locationCoordinatesMapper = new LocationCoordinatesMapperService();
  vi.spyOn(locationCoordinatesMapper, "checkVrrCoordinatesIntegrity")
    .mockReturnValue(true);

  mapper = new LocationMapperService(apiService, locationCoordinatesMapper);

  vi.spyOn(mapper["detailsMapper"], "mapVrrLocationDetails")
    .mockReturnValue(LOCATION_DETAILS);
});

it.each([
  ["missing id",
    vrrLocation(undefined, "Gelsenkirchen, Hbf", VrrLocationType.Stop), false],
  ["missing coordinates",
    { ...vrrLocation("de:05513:5613", "Gelsenkirchen, Hbf", VrrLocationType.Stop), coord: undefined }, false],
  ["valid location",
    vrrLocation("de:05513:5613", "Gelsenkirchen, Hbf", VrrLocationType.Stop), true]
])("check location: %s", (_descr, vrrLocation, expectedResult) => {
  // Given
  // When
  const checkResult = mapper.checkVrrLocationIntegrity(vrrLocation);

  // Then
  expect(checkResult).toBe(expectedResult);
});

it.each([
  { validCoordinates: false, result: false },
  { validCoordinates: true, result: true }
])("process mappers' result ($validCoordinates).", ({ validCoordinates, result }) => {
  // Given
  const location: VrrLocation = vrrLocation("de:05513:5613", "Gelsenkirchen, Hbf", VrrLocationType.Stop);

  vi.spyOn(mapper["locationCoordinatesMapper"], "checkVrrCoordinatesIntegrity")
    .mockReturnValueOnce(validCoordinates);

  // When
  const checkResult = mapper.checkVrrLocationIntegrity(location);

  // Then
  expect(checkResult).toBe(result);
});

it("map vrr location with all fields given.", () => {
  // Given
  const location: VrrLocation = vrrLocation("de:05513:5613", "Gelsenkirchen, Hbf", VrrLocationType.Stop);

  const expectedLocation: Location = {
    id: "de:05513:5613",
    name: "Gelsenkirchen, Hbf",
    type: LocationType.stop,
    details: LOCATION_DETAILS
  };

  // When
  const mappedLocation = mapper.mapVrrLocation(location);

  // Then
  expect(mappedLocation).toEqual(expectedLocation);
});

it("map vrr location with missing optional fields.", () => {
  // Given
  const location: VrrLocation = vrrLocation("de:05513:5613", undefined, undefined);

  const expectedLocation: Location = {
    id: "de:05513:5613",
    name: "",
    type: LocationType.unknown,
    details: LOCATION_DETAILS
  };

  // When
  const mappedLocation = mapper.mapVrrLocation(location);

  // Then
  expect(mappedLocation).toEqual(expectedLocation);
});

it("throw error if invalid location.", () => {
  // Given
  const invalidLocation: VrrLocation = vrrLocation(undefined, "Gelsenkirchen, Hbf", VrrLocationType.Stop);

  // When & Then
  expect(() => mapper.mapVrrLocation(invalidLocation))
    .toThrowError("location is not complete");
});

it("map rated vrr locations.", () => {
  // Given
  const vrrLocationsWithRating: VrrLocation[] = [
    ratedVrrLocation("de:05513:5613", "Gelsenkirchen, Hbf", VrrLocationType.Stop, 850),
    ratedVrrLocation("de:05513:5579", "Gelsenkirchen, Buerer Str.", VrrLocationType.Stop, 500),
    ratedVrrLocation("coord:790483:5288715:MRCV:Altstadt (Gelsenkirchen), Bahnhofcenter:0", "Altstadt (Gelsenkirchen), Bahnhofcenter", VrrLocationType.Stop, 250)
  ];

  const expectedRatedLocations: RatedLocation[] = [
    { id: "de:05513:5613", name: "Gelsenkirchen, Hbf", type: LocationType.stop, rating: 850, details: LOCATION_DETAILS },
    { id: "de:05513:5579", name: "Gelsenkirchen, Buerer Str.", type: LocationType.stop, rating: 500, details: LOCATION_DETAILS },
    {
      id: "coord:790483:5288715:MRCV:Altstadt (Gelsenkirchen), Bahnhofcenter:0",
      name: "Altstadt (Gelsenkirchen), Bahnhofcenter",
      type: LocationType.stop,
      rating: 250,
      details: LOCATION_DETAILS
    }
  ];

  // When
  const mappedRatedLocations = mapper.mapRatedVrrLocations(vrrLocationsWithRating);

  // Then
  expect(mappedRatedLocations).toEqual(expectedRatedLocations);
});

it("map rated vrr locations with missing optional fields.", () => {
  // Given
  const vrrLocationWithMissingOptionalFields: VrrLocation[] = [
    ratedVrrLocation("de:05513:5613", "Gelsenkirchen, Hbf", VrrLocationType.Stop, undefined)
  ];

  const expectedRatedLocations: RatedLocation[] = [
    { id: "de:05513:5613", name: "Gelsenkirchen, Hbf", type: LocationType.stop, rating: 0, details: LOCATION_DETAILS }
  ];

  // When
  const mappedRatedLocations = mapper.mapRatedVrrLocations(vrrLocationWithMissingOptionalFields);

  // Then
  expect(mappedRatedLocations).toEqual(expectedRatedLocations);
});

it("do not map invalid rated vrr locations.", () => {
  // Given
  const vrrLocationWithoutId = ratedVrrLocation(undefined, "Gelsenkirchen, Buerer Str.", VrrLocationType.Stop, 500);
  const vrrLocationWithoutCoordinates = ratedVrrLocation("de:05513:5579", "Gelsenkirchen, Buerer Str.", VrrLocationType.Stop, 500);
  vrrLocationWithoutCoordinates.coord = undefined;
  const vrrLocationWithoutIdAndCoordinates = ratedVrrLocation(undefined, "Gelsenkirchen, Buerer Str.", VrrLocationType.Stop, 375);
  vrrLocationWithoutIdAndCoordinates.coord = undefined;

  const vrrLocationsWithRating: VrrLocation[] = [
    vrrLocationWithoutId,
    vrrLocationWithoutCoordinates,
    ratedVrrLocation("de:05513:4662", "Gelsenkirchen, Buer Rathaus", VrrLocationType.Stop, 700),
    vrrLocationWithoutIdAndCoordinates,
    ratedVrrLocation("coord:790483:5288715:MRCV:Altstadt (Gelsenkirchen), Bahnhofcenter:0", "Altstadt (Gelsenkirchen), Bahnhofcenter", VrrLocationType.Stop, 250)
  ];

  const expectedRatedLocations: RatedLocation[] = [
    {
      id: "de:05513:4662",
      name: "Gelsenkirchen, Buer Rathaus",
      type: LocationType.stop,
      rating: 700, details:
      LOCATION_DETAILS
    },
    {
      id: "coord:790483:5288715:MRCV:Altstadt (Gelsenkirchen), Bahnhofcenter:0",
      name: "Altstadt (Gelsenkirchen), Bahnhofcenter",
      type: LocationType.stop,
      rating: 250,
      details: LOCATION_DETAILS
    }
  ];

  // When
  const mappedRatedLocations = mapper.mapRatedVrrLocations(vrrLocationsWithRating);

  // Then
  expect(mappedRatedLocations).toEqual(expectedRatedLocations);
});

it("map vrr location with assigned stops.", () => {
  // Given
  const topLevelVrrLocation: VrrLocation =
    vrrLocation("coord:790483:5288715:MRCV:Altstadt (Gelsenkirchen), Bahnhofcenter:0", "Altstadt (Gelsenkirchen), Bahnhofcenter", VrrLocationType.Stop);
  topLevelVrrLocation.assignedStops = [
    ratedVrrLocation("de:05513:5613", "Gelsenkirchen, Hbf", VrrLocationType.Stop, 850),
    ratedVrrLocation("de:05513:5579", "Gelsenkirchen, Buerer Str.", VrrLocationType.Stop, 500),
    ratedVrrLocation("de:05513:4662", "Gelsenkirchen, Buer Rathaus", VrrLocationType.Stop, 250)
  ];

  const expectedLocation: LocationWithAssignedStops = {
    id: "coord:790483:5288715:MRCV:Altstadt (Gelsenkirchen), Bahnhofcenter:0",
    name: "Altstadt (Gelsenkirchen), Bahnhofcenter",
    type: LocationType.stop,
    details: LOCATION_DETAILS,
    assignedStops: [
      { id: "de:05513:5613", name: "Gelsenkirchen, Hbf", type: LocationType.stop, rating: 850, details: LOCATION_DETAILS },
      { id: "de:05513:5579", name: "Gelsenkirchen, Buerer Str.", type: LocationType.stop, rating: 500, details: LOCATION_DETAILS },
      { id: "de:05513:4662", name: "Gelsenkirchen, Buer Rathaus", type: LocationType.stop, rating: 250, details: LOCATION_DETAILS }
    ]
  };

  // When
  const mappedLocationsWithAssignedStops = mapper.mapVrrLocationWithAssignedStops(topLevelVrrLocation);

  // Then
  expect(mappedLocationsWithAssignedStops).toEqual(expectedLocation);
});

it("map vrr location missing assigned stops.", () => {
  // Given
  const locationWithMissingAssignedStops: VrrLocation =
    vrrLocation("coord:790483:5288715:MRCV:Altstadt (Gelsenkirchen), Bahnhofcenter:0",
      "Altstadt (Gelsenkirchen), Bahnhofcenter", VrrLocationType.Stop);

  const expectedLocation: LocationWithAssignedStops = {
    id: "coord:790483:5288715:MRCV:Altstadt (Gelsenkirchen), Bahnhofcenter:0",
    name: "Altstadt (Gelsenkirchen), Bahnhofcenter",
    type: LocationType.stop,
    details: LOCATION_DETAILS,
    assignedStops: []
  };

  // When
  const mappedLocationsWithAssignedStops =
    mapper.mapVrrLocationWithAssignedStops(locationWithMissingAssignedStops);

  // Then
  expect(mappedLocationsWithAssignedStops).toEqual(expectedLocation);
});

it("throw error if invalid location (that has assigned stops).", () => {
  // Given
  const location: VrrLocation = vrrLocation(undefined, "Altstadt (Gelsenkirchen), Bahnhofcenter", VrrLocationType.Stop);

  // When & Then
  expect(() => mapper.mapVrrLocationWithAssignedStops(location))
    .toThrowError("location is not complete");
});

function vrrLocation(
  id?: string,
  name?: string,
  type?: VrrLocationType
): VrrLocation {

  return {
    id: id,
    name: name,
    type: type,
    coord: [51.50, 7.10],
    parent: {
      id: "placeID:5513000:9",
      name: "Gelsenkirchen",
      type: VrrLocationType.Locality
    }
  } as VrrLocation;
}

function ratedVrrLocation(
  id?: string,
  name?: string,
  type?: VrrLocationType,
  rating?: number
): VrrLocation {

  const baseVrrLocation = vrrLocation(id, name, type);

  return {
    ...baseVrrLocation,
    matchQuality: rating
  } as VrrLocation;
}
