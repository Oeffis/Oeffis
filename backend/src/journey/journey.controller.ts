import { Controller, Get, Inject } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JourneyService } from "./services/journey.service";

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
  respond() {
    return 'Just some response.';
  }

  // TODO methods for requests.

}
