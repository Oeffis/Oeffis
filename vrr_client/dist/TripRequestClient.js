"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripRequestClient = void 0;
const VrrClientBase_1 = require("./VrrClientBase");
const VrrApiTypes_1 = require("./vendor/VrrApiTypes");
class TripRequestClient extends VrrClientBase_1.VrrClientBase {
    async queryTrip(query) {
        const viaOptions = query.viaPointId ?
            {
                name_via: query.viaPointId,
                type_via: 'any',
            } : {};
        return this.executeFetchRequest('/static03/XML_TRIP_REQUEST2', Object.assign({ name_origin: query.originPointId, type_origin: 'any', name_destination: query.destinationPointId, type_destination: 'any' }, viaOptions), (0, VrrClientBase_1.warpAsFailSafeSchemaConverter)(VrrApiTypes_1.Convert.toTRIPSchema));
    }
}
exports.TripRequestClient = TripRequestClient;
//# sourceMappingURL=TripRequestClient.js.map