import * as Express from "express";
import { responseWithLocations } from "../fixtures/stopFinder/responseWithLocations";
import { stops } from "../fixtures/stopFinder/stops";

interface StopFinderQuery {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    name_sf: string;
    limit?: number;
}

function isStopFinderQuery(obj: unknown): obj is StopFinderQuery {
    return typeof obj === "object"
        && obj !== null
        && typeof (obj as StopFinderQuery).name_sf === "string";
}

export default [
    {
        id: "stopFinder",
        url: "/static03/XML_STOPFINDER_REQUEST",
        method: "GET",
        variants: [
            {
                id: "sample stops",
                type: "middleware",
                options: {
                    middleware: (req: Express.Request, res: Express.Response) => {
                        const body: unknown = req.query;
                        if (!isStopFinderQuery(body)) {
                            res.status(400);
                            res.send();
                            return;
                        }

                        const name = body.name_sf;
                        const result = stops.filter(stop => stop.id === name || stop.name.includes(name));
                        res.status(200);
                        res.send(responseWithLocations(result));
                    }
                }
            }
        ]
    }
];
