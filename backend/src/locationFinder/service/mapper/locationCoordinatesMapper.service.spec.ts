import { LocationCoordinates } from "../../entity/locationCoordinates.entity";
import { LocationCoordinatesMapperService } from "./locationCoordinatesMapper.service";

let locationCoordiantesMapper: LocationCoordinatesMapperService;

beforeEach(() => {
  locationCoordiantesMapper = new LocationCoordinatesMapperService();
});

it.each([
  ["no elements", [], false],
  ["wrong number of elements", [56.5, 7.1, 8.1], false],
  ["non-number element (first)", [{ d: 5 }, 8.1], false],
  ["non-number element (second)", [56.5, { d: 5 }], false],
  ["valid coordinates", [56.5, 7.1], true]
])("check location coordinates: %s", (_descr, coordinates, expectedResult) => {
  // Given
  // When
  const checkResult = locationCoordiantesMapper.checkVrrCoordinatesIntegrity(coordinates);

  // Then
  expect(checkResult).toBe(expectedResult);
});

it("map location coordinates.", () => {
  // Given
  const locationCoordinates = [51.6, 7.1];

  const expectedLocationCoordinates = {
    latitude: 51.6,
    longitude: 7.1
  } as LocationCoordinates;

  // When
  const mappedLocationCoordinates =
    locationCoordiantesMapper.mapLocationCoordinates(locationCoordinates);

  // Then
  expect(mappedLocationCoordinates).toEqual(expectedLocationCoordinates);
});

it("throw error if invalid location coordinates.", () => {
  // Given
  const invalidLocationCoordinates = [{ d: 5 }, 7.1];

  // When & Then
  expect(() => locationCoordiantesMapper.mapLocationCoordinates(invalidLocationCoordinates))
    .toThrowError("coordinates has no supported format");
});
