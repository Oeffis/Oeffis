import { Module } from '@nestjs/common';
import { JourneyController } from './journey.controller';
import { JourneyHafasService } from './services/journey.hafas.service';

@Module({
  controllers: [JourneyController],
  providers: [
    {
      provide: 'JourneyHafasService',
      useClass: JourneyHafasService,
    }
  ],
})

export class JourneyModule { }

/*
 * TODO: 
 */
