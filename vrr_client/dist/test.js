"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
async function demoTripRequestClient() {
    const tripRequestClient = new _1.TripRequestClient(_1.VRR_TEST_API_BASE_URL);
    const result = await tripRequestClient.queryTrip({
        destinationPointId: 'coord:755620:5337741:MRCV:Stadtmitte (Düsseldorf), Jacobistraße 2:0',
        originPointId: 'poiID:2450:5513000:-1:Rathaus Buer:Gelsenkirchen:Rathaus Buer:ANY:POI:785651:5275982:MRCV:nrw',
    });
    console.log('Planed trip:', result);
}
async function demoStopFinderClient() {
    var _a, _b;
    const stopFinderClient = new _1.StopFinderClient(_1.VRR_TEST_API_BASE_URL);
    const result = await stopFinderClient.findStopAtCoordinates({
        latitude: 51.231000,
        longitude: 6.787835,
    });
    console.log('Result:', (_a = result.locations) === null || _a === void 0 ? void 0 : _a.map((location) => location.id));
    const result2 = await stopFinderClient.findStopByName({
        search: 'Buer Rathaus',
    });
    console.log('Result2:', (_b = result2.locations) === null || _b === void 0 ? void 0 : _b.map((location) => location.id));
}
async function demoServingLinesClient() {
    const servingLinesClient = new _1.ServingLinesClient(_1.VRR_TEST_API_BASE_URL);
    const result = await servingLinesClient.findServingLinesByStop({
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
    .then(console.log)
    .catch(console.error);
//# sourceMappingURL=test.js.map