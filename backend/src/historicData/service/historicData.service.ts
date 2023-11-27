import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DelayEntry } from "historicData/entity/delayEntry.entity";
import { Equal, IsNull, MoreThan, Not, Repository } from "typeorm";

interface DelayOptions {
  tripId: string;
  since?: Date;
}

export type DelayEntryWithEstimate = Required<DelayEntry>;

@Injectable()
export class HistoricDataService {
  public constructor(
    @InjectRepository(DelayEntry)
    private readonly delayEntryRepository: Repository<DelayEntry>
  ) { }

  public async getDelays({ tripId, since }: DelayOptions): Promise<DelayEntryWithEstimate[]> {
    const entries = await this.delayEntryRepository.find({
      where: {
        estimated: Not(IsNull()),
        tripId: Equal(tripId),
        planned: since ? MoreThan(since) : undefined
      }
    });

    return entries as DelayEntryWithEstimate[];
  }
}
