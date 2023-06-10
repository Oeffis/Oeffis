import { Controller, Get, Inject } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JourneyService } from "./services/journey.service";
import { createClient } from 'hafas-client';
import { profile as dbProfile } from 'hafas-client/p/db/index.js';

// Adapt this to your project! createClient() won't work with this string.
const userAgent = 'link-to-your-project-or-email';

// create a client with the Deutsche Bahn profile
const client = createClient(dbProfile, userAgent);

/**
 * Endpoint for request regarding planning a journey. 
 */
@Controller('journey')
@ApiTags('journey')
export class JourneyController {

  constructor(
    @Inject('JourneyHafasService')
    private readonly journeyHafasService: JourneyService,
  ) { }


  // just some test method
  @Get('get/test')
  @ApiOperation({ summary: 'Test method.' })
  @ApiOkResponse({ description: 'Worked.' })
  async respond() {

    // Berlin Jungfernheide to München Hbf
    const { journeys } = await client.journeys('8011167', '8000261', {
      results: 1,
    });
    console.log(journeys[0]);

    return 'Just some response.';
  }

  // TODO methods for requests.

}
