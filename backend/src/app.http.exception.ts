import { ApiProperty } from '@nestjs/swagger';

export class AppHttpException {
    @ApiProperty({
        description: 'Http status code',
        example: 404
    })
    statusCode: Number;
    @ApiProperty({
        description: 'Error message',
        example: "User not found."
    })
    message: string;
}