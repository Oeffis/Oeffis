import { Test, TestingModule } from "@nestjs/testing";
import { TripRequestClient } from "@oeffis/vrr_client";
import { ApiService } from "./api.service";

let service: ApiService;

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [ApiService]
  }).compile();

  service = module.get<ApiService>(ApiService);
});

it("creates an instance of a client", () => {
  expect(service.getInstanceOf(TripRequestClient)).toBeInstanceOf(TripRequestClient);
});
