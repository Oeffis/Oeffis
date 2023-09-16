/* eslint-disable @typescript-eslint/naming-convention */
import { Convert, DMTTPSchema } from "./vendor/VrrApiTypes";
import { VrrClientBase, warpAsFailSafeSchemaConverter } from "./VrrClientBase";

interface DeparturesQuery {
  stopId: string;
  limit?: number;
}

export class DeparturesClient extends VrrClientBase {
  public async findDeparturesByStop(query: DeparturesQuery): Promise<DMTTPSchema> {
    return this.executeFetchRequest(
      "/static03/XML_DM_REQUEST",
      {
        name_dm: "de:05513:5613",
        type_dm: "any",
        mode: "direct",
        limit: query.limit || 100
      },
      warpAsFailSafeSchemaConverter(Convert.toDMTTPSchema),
    );
  }
}
