import { Test, TestingModule } from "@nestjs/testing";
import { TripQueryService } from "./trip_query.service";

describe("TripQueryService", () => {
  let service: TripQueryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TripQueryService]
    }).compile();

    service = module.get<TripQueryService>(TripQueryService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
