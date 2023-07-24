import { VrrClientBase } from "./VrrClientBase";
import { SERVINGLINESSchema } from "./vendor/VrrApiTypes";
export type FindServingLinesByStopParameters = {
    pointId: string;
};
export type FindServingLinesByLineName = {
    search: string;
};
export declare class ServingLinesClient extends VrrClientBase {
    findServingLinesByStop(query: FindServingLinesByStopParameters): Promise<SERVINGLINESSchema>;
    findServingLinesByLineName(query: FindServingLinesByLineName): Promise<SERVINGLINESSchema>;
}
