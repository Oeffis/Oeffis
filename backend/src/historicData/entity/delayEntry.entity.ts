import { Entity, PrimaryColumn } from "typeorm";

@Entity("historic_data")
export class DelayEntry {
  @PrimaryColumn()
  public readonly id: number;

  public constructor(id: number) {
    this.id = id;
  }
}
