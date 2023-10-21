import { Location as VrrLocation, LocationType as VrrLocationType } from "@oeffis/vrr_client/dist/vendor/VrrApiTypes";
import { LocationType } from "../../../vrr/entity/locationType.entity";
import { ApiService } from "../../../vrr/service/api.service";
import { LocationCoordinates } from "../../entity/locationCoordinates.entity";
import { LocationDetails } from "../../entity/locationDetails.entity";
import { LocationCoordinatesMapperService } from "./locationCoordinatesMapper.service";
import { LocationDetailsMapperService } from "./locationDetailsMapper.service";

const LOCATION_COORDINATES = {
  latitude: 51.6,
  longitude: 7.1
} as LocationCoordinates;

let detailsMapper: LocationDetailsMapperService;

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
  vi.spyOn(locationCoordinatesMapper, "mapLocationCoordinates")
    .mockReturnValue(LOCATION_COORDINATES);

  detailsMapper = new LocationDetailsMapperService(apiService, locationCoordinatesMapper);
});

it("map details with all fields given and one parent.", () => {
  // Given
  const vrrLocationWithDetails = vrrLocation(
    [51.60, 7.10],
    "Hbf",
    vrrLocationFinalParent("placeID:5513000:9", "Gelsenkirchen", VrrLocationType.Stop));

  const expectedLocationDetails: LocationDetails = {
    shortName: "Hbf",
    coordinates: LOCATION_COORDINATES,
    parent: { id: "placeID:5513000:9", name: "Gelsenkirchen", type: LocationType.stop, details: {} }
  };

  // When
  const mappedLocationDetails = detailsMapper.mapVrrLocationDetails(vrrLocationWithDetails);

  // Then
  expect(mappedLocationDetails).toEqual(expectedLocationDetails);
});

it("map details with all fields given and two parents.", () => {
  // Given
  const vrrLocationWithTwoParents = vrrLocation(
    [52.88, 7.90],
    "7",
    vrrLocationParent(
      "de:05513:5613", "Gelsenkirchen, Hbf", "Hbf", VrrLocationType.Stop, [52.98, 7.91],
      vrrLocationFinalParent("placeID:5513000:9", "Gelsenkirchen", VrrLocationType.Stop)
    )
  );

  const expectedLocationDetails: LocationDetails = {
    shortName: "7",
    coordinates: LOCATION_COORDINATES,
    parent: {
      id: "de:05513:5613", name: "Gelsenkirchen, Hbf", type: LocationType.stop, details: {
        shortName: "Hbf", coordinates: LOCATION_COORDINATES, parent: {
          id: "placeID:5513000:9", name: "Gelsenkirchen", type: LocationType.stop, details: {}
        }
      }
    }
  };

  // When
  const mappedLocationDetails = detailsMapper.mapVrrLocationDetails(vrrLocationWithTwoParents);

  // Then
  expect(mappedLocationDetails).toEqual(expectedLocationDetails);
});

it("map details with missing parent.", () => {
  // Given
  const vrrLocationWithoutParent = vrrLocation(
    [51.60, 7.10],
    "Hbf",
    undefined);

  const expectedLocationDetails: LocationDetails = {
    shortName: "Hbf",
    coordinates: LOCATION_COORDINATES,
    parent: { id: "", name: "", type: LocationType.unknown, details: {} }
  };

  // When
  const mappedLocationDetails = detailsMapper.mapVrrLocationDetails(vrrLocationWithoutParent);

  // Then
  expect(mappedLocationDetails).toEqual(expectedLocationDetails);
});

it("map details with missing optional fields.", () => {
  // Given
  const vrrLocationWithoutOptionalFields = vrrLocation(
    [51.60, 7.10],
    undefined,
    vrrLocationFinalParent());

  const expectedLocationDetails: LocationDetails = {
    shortName: "",
    coordinates: LOCATION_COORDINATES,
    parent: { id: "", name: "", type: LocationType.unknown, details: {} }
  };

  // When
  const mappedLocationDetails = detailsMapper.mapVrrLocationDetails(vrrLocationWithoutOptionalFields);

  // Then
  expect(mappedLocationDetails).toEqual(expectedLocationDetails);
});

function vrrLocation(
  coordinates: number[],
  disassembledName?: string,
  parent?: VrrLocation
): VrrLocation {

  return {
    disassembledName: disassembledName,
    coord: coordinates,
    parent: parent
  } as VrrLocation;
}

function vrrLocationFinalParent(
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

function vrrLocationParent(
  id: string,
  name: string,
  disassembledName: string,
  type: VrrLocationType,
  coords: number[],
  parent: VrrLocation
): VrrLocation {

  return {
    id: id,
    name: name,
    disassembledName: disassembledName,
    type: type,
    coord: coords,
    parent: parent
  } as VrrLocation;
}
