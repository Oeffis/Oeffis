import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DelayEntry } from "historicData/entity/delayEntry.entity";
import { Repository } from "typeorm";

@Injectable()
export class HistoricDataService {
  public constructor(
    @InjectRepository(DelayEntry)
    private readonly delayEntryRepository: Repository<DelayEntry>
  ) { }

  public getDelayEntryCount(): Promise<number> {
    return this.delayEntryRepository.count();
  }
}
