import { StopFinderResponseGelsenkirchenHbf } from "../fixtures/response_gelsenkirchen_hbf";

export default [
    {
        id: "stop_finder",
        url: "/static03/XML_STOPFINDER_REQUEST",
        method: "GET",
        variants: [
            {
                id: "result for 'Gelsenkirchen Hbf'",
                type: "json",
                options: {
                    status: 200,
                    body: StopFinderResponseGelsenkirchenHbf
                }
            }
        ]
    }
];
