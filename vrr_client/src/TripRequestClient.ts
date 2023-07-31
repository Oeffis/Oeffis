/* eslint-disable @typescript-eslint/naming-convention */
import { VrrClientBase, warpAsFailSafeSchemaConverter } from "./VrrClientBase";
import { Convert, TRIPSchema } from "./vendor/VrrApiTypes";

export type QueryTripParameters = {
  originPointId: string;
  destinationPointId: string;
  viaPointId?: string;
};

export type FindStopByNameParameters = {
  search: string;
};

export class TripRequestClient extends VrrClientBase {
  public async queryTrip(query: QueryTripParameters): Promise<TRIPSchema> {
    const viaOptions: Record<string, string> = query.viaPointId
      ? {
        name_via: query.viaPointId,
        type_via: "any"
      }
      : {};

    return this.executeFetchRequest(
      "/static03/XML_TRIP_REQUEST2",
      {
        name_origin: query.originPointId,
        type_origin: "any",

        name_destination: query.destinationPointId,
        type_destination: "any",

        ...viaOptions
      },
      warpAsFailSafeSchemaConverter(Convert.toTRIPSchema),
    );
  }
}
