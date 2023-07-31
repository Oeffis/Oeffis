import { Test, TestingModule } from "@nestjs/testing";
import { Stop } from "stop_finder/dto/stop";
import { StopFinderService } from "../service/stop_finder.service";
import { StopFinderController } from "./stop_finder.controller";

let stopFinderController: StopFinderController;
let app: TestingModule;

beforeEach(async () => {
  app = await Test.createTestingModule({
    controllers: [StopFinderController],
    providers: [StopFinderService]
  }).compile();

  stopFinderController = app.get<StopFinderController>(StopFinderController);
});

it("finds stops by coordinates", async () => {
  const mockedStops = [stop("coord:790483:5288715:MRCV:Altstadt (Gelsenkirchen), Bahnhofcenter:0")];
  vi.spyOn(app.get(StopFinderService), "findStopsAtLocation").mockResolvedValue({ stops: mockedStops });
  const requestBody = {
    "latitude": 51.50598042775682,
    "longitude": 7.101082448485377
  };

  const response = await stopFinderController.findStopsAtCoordinates(requestBody);

  expect(response.stops).toEqual(mockedStops);
});

it("finds stops by names", async () => {
  const mockedStops = [
    stop("coord:790483:5288715:MRCV:Altstadt (Gelsenkirchen), Bahnhofcenter:0"),
    stop("poiID:70667:5513000:-1:Gelsenkirchen Hauptbahnhof Bahnhofsvorplatz:Gelsenkirchen:Gelsenkirchen Hauptbahnhof Bahnhofsvorplatz:ANY:POI:790425:5288652:MRCV:nrw"),
    stop("poiID:70666:5513000:-1:Gelsenkirchen Hauptbahnhof Südausgang:Gelsenkirchen:Gelsenkirchen Hauptbahnhof Südausgang:ANY:POI:790698:5288992:MRCV:nrw"),
    stop("poiID:65953:5513000:-1:Parkhaus Hauptbahnhof-Süd:Gelsenkirchen:Parkhaus Hauptbahnhof-Süd:ANY:POI:790858:5288938:MRCV:nrw"),
    stop("poiID:71952:5513000:-1:Hauptbahnhof Parkhaus:Gelsenkirchen:Hauptbahnhof Parkhaus:ANY:POI:790652:5288935:MRCV:nrw"),
    stop("de:05513:5613")
  ];
  vi.spyOn(app.get(StopFinderService), "findStopByName").mockResolvedValue({ stops: mockedStops });
  const requestBody = {
    "name": "Gelsenkirchen Hbf"
  };

  const response = await stopFinderController.findStopByName(requestBody);
  expect(response.stops).toEqual(mockedStops);
});

function stop(id: string): Stop {
  return {
    "id": id,
    "name": "Gelsenkirchen Hbf",
    "latitude": 51.506,
    "longitude": 7.101
  };
}
