import { VrrClientBase } from "./VrrClientBase";
import { LOCATIONSUGGESTSchema } from "./vendor/VrrApiTypes";
export type FindStopAtCoordinatesParameters = {
    latitude: number;
    longitude: number;
};
export type FindStopByNameParameters = {
    search: string;
};
export declare class StopFinderClient extends VrrClientBase {
    findStopAtCoordinates(query: FindStopAtCoordinatesParameters): Promise<LOCATIONSUGGESTSchema>;
    findStopByName(query: FindStopByNameParameters): Promise<LOCATIONSUGGESTSchema>;
    private formatCoordinates;
}
