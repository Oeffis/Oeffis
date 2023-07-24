import { VrrClientBase } from "./VrrClientBase";
import { TRIPSchema } from "./vendor/VrrApiTypes";
export type QueryTripParameters = {
    originPointId: string;
    destinationPointId: string;
    viaPointId?: string;
};
export type FindStopByNameParameters = {
    search: string;
};
export declare class TripRequestClient extends VrrClientBase {
    queryTrip(query: QueryTripParameters): Promise<TRIPSchema>;
}
