import { ApiProperty } from "@nestjs/swagger";
import { Stop } from "stop_finder/dto/stop";

export class Trip {
  @ApiProperty({
    description: "Legs of the alternative.",
    type: [Stop],
    required: true
  })
  legs!: TripLeg[];
}

export class TripLeg {
  @ApiProperty({
    description: "Origin of the leg.",
    type: Stop,
    required: true
  })
  origin!: Stop;


  @ApiProperty({
    description: "Destination of the leg.",
    type: Stop,
    required: true
  })
  destination!: Stop;

  @ApiProperty({
    description: "Origin of the leg.",
    type: Stop,
    required: true
  })
  name!: string;
}
