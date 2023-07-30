import { Test, TestingModule } from "@nestjs/testing";
import { StopFinderService } from "../service/stop_finder.service";
import { StopFinderController } from "./stop_finder.controller";

test("StopFinderController", () => {
  let stopFinderController: StopFinderController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StopFinderController],
      providers: [StopFinderService],
    }).compile();

    stopFinderController = app.get<StopFinderController>(StopFinderController);
  });

  test("root", () => {
    it("should return \"Hello World!\"", () => {
      expect(stopFinderController.findStopsAtCoordinates({
        "latitude": 51.50598042775682,
        "longitude": 7.101082448485377
      })).toBe({
        "stops": [
          "coord:790483:5288715:MRCV:Altstadt (Gelsenkirchen), Bahnhofcenter:0"
        ]
      });
    });
  });
});
