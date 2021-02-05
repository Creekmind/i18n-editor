import { epoch, string } from '@cmind/class-mapper/decorators';

export class DataObject {
  @string()
  id!: string;

  @epoch()
  createDate!: Date;

  @epoch()
  updateDate!: Date;

  constructor(id: string) {
    this.id = id;
  }
}
