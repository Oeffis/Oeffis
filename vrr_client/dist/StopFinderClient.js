"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StopFinderClient = void 0;
const Constants_1 = require("./Constants");
const VrrClientBase_1 = require("./VrrClientBase");
const VrrApiTypes_1 = require("./vendor/VrrApiTypes");
class StopFinderClient extends VrrClientBase_1.VrrClientBase {
    async findStopAtCoordinates(query) {
        const formattedCoordinates = this.formatCoordinates(query.latitude, query.longitude);
        return this.executeFetchRequest('/static03/XML_STOPFINDER_REQUEST', {
            name_sf: formattedCoordinates,
            type_sf: 'coord',
        }, VrrApiTypes_1.Convert.toLOCATIONSUGGESTSchema);
    }
    async findStopByName(query) {
        return this.executeFetchRequest('/static03/XML_STOPFINDER_REQUEST', {
            name_sf: query.search,
            type_sf: 'any',
        }, VrrApiTypes_1.Convert.toLOCATIONSUGGESTSchema);
    }
    formatCoordinates(latitude, longitude) {
        if (latitude < 0 || longitude < 0) {
            throw new Error('Coordinates must be positive');
        }
        if (latitude > 90) {
            throw new Error('Latitude must be less than 90');
        }
        if (longitude > 180) {
            throw new Error('Longitude must be less than 180');
        }
        return `${longitude.toFixed(5)}:${latitude.toFixed(5)}:WGS84[dd.ddddd]`;
    }
}
exports.StopFinderClient = StopFinderClient;
async function main() {
    var _a, _b;
    const client = new StopFinderClient(Constants_1.VRR_TEST_API_BASE_URL);
    const result = await client.findStopAtCoordinates({
        latitude: 51.231000,
        longitude: 6.787835,
    });
    console.log('Result:', (_a = result.locations) === null || _a === void 0 ? void 0 : _a.map((location) => location.id));
    const result2 = await client.findStopByName({
        search: 'Buer Rathaus',
    });
    console.log('Result2:', (_b = result2.locations) === null || _b === void 0 ? void 0 : _b.map((location) => location.id));
}
main()
    .then(console.log)
    .catch(console.error);
//# sourceMappingURL=StopFinderClient.js.map