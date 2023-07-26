import { VRR_TEST_API_BASE_URL } from "./Constants";
import { VrrClientBase, warpAsFailSafeSchemaConverter } from "./VrrClientBase";
import { Convert, SERVINGLINESSchema, Transportation } from "./vendor/VrrApiTypes";

export type FindServingLinesByStopParameters = {
  pointId: string;
};

export type FindServingLinesByLineName = {
  search: string;
};

export class ServingLinesClient extends VrrClientBase {

  public async findServingLinesByStop(query: FindServingLinesByStopParameters): Promise<SERVINGLINESSchema> {
    return this.executeFetchRequest('/static03/XML_SERVINGLINES_REQUEST', {
      name_sl: query.pointId,
      type_sl: 'any',
      mode: 'odv',
      // This will make the API ignore the type_sl parameter, because its not required but its presence is required.
      typeInfo_sl: 'invalid',
    }, warpAsFailSafeSchemaConverter(Convert.toSERVINGLINESSchema));
  }

  public async findServingLinesByLineName(query: FindServingLinesByLineName): Promise<SERVINGLINESSchema> {
    return this.executeFetchRequest('/static03/XML_SERVINGLINES_REQUEST', {
      lineName: query.search,
      mode: 'line',
    }, warpAsFailSafeSchemaConverter(Convert.toSERVINGLINESSchema));
  }
}
