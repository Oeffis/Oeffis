import { Test, TestingModule } from "@nestjs/testing";
import { TripRequestClient } from "@oeffis/vrr_client/dist/TripRequestClient";
import { ApiService } from "./api.service";

describe("ApiService", () => {
  let service: ApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiService],
    }).compile();

    service = module.get<ApiService>(ApiService);
  });

  it("creates an instance of a trip request client", () => {
    expect(service.tripRequestClient()).toBeInstanceOf(TripRequestClient);
  });

  it("creates the trip request client as a singleton", () => {
    expect(service.tripRequestClient()).toBe(service.tripRequestClient());
  });
});
