import { Body, Controller, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { BadRequest } from "app/entity/badrequest.entity";
import { TripQueryRequestDto } from "trip_query/dto/tripQueryRequest";
import { TripQueryResponseDto } from "trip_query/dto/tripQueryResponse";
import { TripQueryService } from "../service/trip_query.service";

@Controller("trip_query")
@ApiTags("trip_query")
export class TripQueryController {
  constructor(private readonly tripQueryService: TripQueryService) { }

  @Post()
  @ApiOperation({
    summary: "queries a trip"
  })
  @ApiOkResponse({
    description: "Trip alternatives found.",
    type: TripQueryResponseDto
  })
  @ApiBadRequestResponse({
    description: "Bad request.",
    type: BadRequest
  })
  public queryTrip(@Body() requestBody: TripQueryRequestDto): Promise<TripQueryResponseDto> {
    return this.tripQueryService.queryTrip(requestBody.origin, requestBody.destination/*, requestBody.departure*/);
  }
}
