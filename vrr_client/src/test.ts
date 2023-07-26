import { ServingLinesClient, VRR_TEST_API_BASE_URL, StopFinderClient, TripRequestClient } from "./";


async function demoTripRequestClient() {
  const tripRequestClient = new TripRequestClient(VRR_TEST_API_BASE_URL);
  const result = await tripRequestClient.queryTrip({
    destinationPointId: 'coord:755620:5337741:MRCV:Stadtmitte (Düsseldorf), Jacobistraße 2:0',
    originPointId: 'poiID:2450:5513000:-1:Rathaus Buer:Gelsenkirchen:Rathaus Buer:ANY:POI:785651:5275982:MRCV:nrw',
  });

  console.log('Planed trip:', result);
}

async function demoStopFinderClient() {
  const stopFinderClient = new StopFinderClient(VRR_TEST_API_BASE_URL);
  const result = await stopFinderClient.findStopAtCoordinates({
    latitude: 51.231000, // Breitengrad
    longitude: 6.787835,  // Längengrad
  });

  console.log('Result:', result.locations?.map((location) => location.id));

  const result2 = await stopFinderClient.findStopByName({
    search: 'Buer Rathaus',
  });

  console.log('Result2:', result2.locations?.map((location) => location.id));
}

async function demoServingLinesClient() {
  const servingLinesClient = new ServingLinesClient(VRR_TEST_API_BASE_URL);
  const result = await servingLinesClient.findServingLinesByStop({
    // pointId: 'coord:755620:5337741:MRCV:Stadtmitte (Düsseldorf), Jacobistraße 2:0',
    // pointId: 'de:05111:18235',
    pointId: 'poiID:62546:5111000:-1:Rheinbahn KundenCenter Hauptbahnhof:Düsseldorf:Rheinbahn KundenCenter Hauptbahnhof:ANY:POI:756112:5339515:MRCV:nrw',
  });

  const result2 = await servingLinesClient.findServingLinesByLineName({
    search: '301',
  });
}

async function main() {
  await demoTripRequestClient();
  await demoStopFinderClient();
  await demoServingLinesClient();
}

main()
  .catch(console.error);
