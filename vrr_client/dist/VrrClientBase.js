"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VrrClientBase = exports.warpAsFailSafeSchemaConverter = void 0;
const node_fetch_1 = require("node-fetch");
const VrrApiTypes_1 = require("./vendor/VrrApiTypes");
function warpAsFailSafeSchemaConverter(schemaConverter) {
    return (json) => {
        try {
            return schemaConverter(json);
        }
        catch (e) {
            console.error('Error while parsing ServingLines response:', e);
            return JSON.parse(json);
        }
    };
}
exports.warpAsFailSafeSchemaConverter = warpAsFailSafeSchemaConverter;
class VrrClientBase {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    async executeFetchRequest(path, parameters, schemaConverter) {
        const options = {
            headers: {},
            method: 'GET',
        };
        const urlWithParams = new URL(path, this.baseUrl);
        urlWithParams.search = new URLSearchParams(Object.assign(Object.assign({}, parameters), { outputFormat: 'rapidJSON', version: '10.4.18.18' })).toString();
        const url = urlWithParams.toString();
        const response = await (0, node_fetch_1.default)(url, options);
        const body = await response.text();
        const status = response.status;
        if (!response.ok) {
            throw new Error(`Request failed with unhandled status ${status}: ${body}`);
        }
        const jsonResult = schemaConverter(body);
        this.checkSystemMessagesForErrors(jsonResult.systemMessages);
        return jsonResult;
    }
    checkSystemMessagesForErrors(systemMessages) {
        if (!systemMessages) {
            return;
        }
        const errors = systemMessages.filter((message) => {
            if (message.type === VrrApiTypes_1.SystemMessageType.Error && message.module === 'BROKER' && message.code === -8011 && message.text === '') {
                return false;
            }
            return message.type === VrrApiTypes_1.SystemMessageType.Error;
        });
        if (errors.length > 0) {
            const formattedErrors = errors.map((error) => `${error.type} / ${error.subType} / ${error.code}: (from ${error.module}): ${error.text}`);
            throw new Error(`Request failed with system messages: ${formattedErrors.join(', ')}`);
        }
    }
}
exports.VrrClientBase = VrrClientBase;
//# sourceMappingURL=VrrClientBase.js.map