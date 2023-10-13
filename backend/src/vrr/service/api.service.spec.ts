import { Test, TestingModule } from "@nestjs/testing";
import { TripRequestClient } from "@oeffis/vrr_client";
import { LocationType as VrrLocationType } from "@oeffis/vrr_client/dist/vendor/VrrApiTypes";
import { LocationType } from "../entity/locationType.entity";
import { ApiService } from "./api.service";

let service: ApiService;

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [ApiService]
  }).compile();

  service = module.get<ApiService>(ApiService);
});

it.each(
  Object.keys(VrrLocationType)
)("map vrr location types (%s).", (vrrLocationTypeKey) => {
  // Given
  const vrrLocationType = VrrLocationType[vrrLocationTypeKey as keyof typeof VrrLocationType];

  // When
  const mappedLocationType = service.mapVrrLocationType(vrrLocationType);

  // Then
  expect(mappedLocationType.valueOf()).toEqual(vrrLocationType.valueOf());
});

it("map undefined vrr location type.", () => {
  // Given
  // When
  const mappedLocationType = service.mapVrrLocationType(undefined);

  // Then
  expect(mappedLocationType).toBe(LocationType.unknown);
});

it("map unknown vrr location type.", () => {
  // Given
  // When
  const mappedLocationType = service.mapVrrLocationType("unknown" as VrrLocationType);

  // Then
  expect(mappedLocationType).toBe(LocationType.unknown);
});

it("creates an instance of a client", () => {
  expect(service.getInstanceOf(TripRequestClient)).toBeInstanceOf(TripRequestClient);
});
