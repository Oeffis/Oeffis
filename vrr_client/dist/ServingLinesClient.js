"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServingLinesClient = void 0;
const VrrClientBase_1 = require("./VrrClientBase");
const VrrApiTypes_1 = require("./vendor/VrrApiTypes");
class ServingLinesClient extends VrrClientBase_1.VrrClientBase {
    async findServingLinesByStop(query) {
        return this.executeFetchRequest('/static03/XML_SERVINGLINES_REQUEST', {
            name_sl: query.pointId,
            type_sl: 'any',
            mode: 'odv',
            typeInfo_sl: 'invalid',
        }, (0, VrrClientBase_1.warpAsFailSafeSchemaConverter)(VrrApiTypes_1.Convert.toSERVINGLINESSchema));
    }
    async findServingLinesByLineName(query) {
        return this.executeFetchRequest('/static03/XML_SERVINGLINES_REQUEST', {
            lineName: query.search,
            mode: 'line',
        }, (0, VrrClientBase_1.warpAsFailSafeSchemaConverter)(VrrApiTypes_1.Convert.toSERVINGLINESSchema));
    }
}
exports.ServingLinesClient = ServingLinesClient;
//# sourceMappingURL=ServingLinesClient.js.map