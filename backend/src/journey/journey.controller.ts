import {Controller, Get, Inject} from "@nestjs/common";
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {JourneyService} from "./services/journey.service";
import {HafasClient} from "hafas-client";

/**
 * Import 'file-type' ES-Module in CommonJS Node.js module
 */
const hafas: Promise<HafasClient> = (async () => {
  const {createClient} = await (eval("import(\"hafas-client\")") as Promise<typeof import("hafas-client")>);
  const {profile} = await (eval("import(\"hafas-client/p/db/index.js\")") as Promise<typeof import("hafas-client/p/db/index.js")>);

  const hafasClient: HafasClient = createClient(profile, "userAgent1234");

  // Berlin Jungfernheide to München Hbf
  const {journeys} = await hafasClient.journeys("8011167", "8000261", {
    results: 1,
  });
  console.log(journeys[0]);

  return hafasClient;
})();

//import { createClient } from 'hafas-client';
//import { profile as dbProfile } from 'hafas-client/p/db/index.js';

// Adapt this to your project! createClient() won't work with this string.
//const userAgent = 'link-to-your-project-or-email';

// create a client with the Deutsche Bahn profile
//const client = createClient(dbProfile, userAgent);

/**
 * Endpoint for request regarding planning a journey. 
 */
@Controller("journey")
@ApiTags("journey")
export class JourneyController {

  private hafas;

  constructor(
    @Inject("JourneyHafasService")
    private readonly journeyHafasService: JourneyService,
  ) { }

  // just some test method
  @Get("get/test")
  @ApiOperation({ summary: "Test method." })
  @ApiOkResponse({ description: "Worked." })
  async respond() {

    // Berlin Jungfernheide to München Hbf
    const hafasClient: HafasClient = await hafas;

    const { journeys } = await hafasClient.journeys("8011167", "8000261", {
      results: 1,
    });
    console.log(journeys[0]);

    return "Just some response.";
  }

  // TODO methods for requests.

}
