import { boolean, string } from '@cmind/class-mapper/decorators';

export class Language {
  @string()
  iso: string;

  data: { [key: string]: string } = {};

  @boolean()
  isPrimary = false;

  constructor(iso: string, isPrimary = false) {
    this.iso = iso;
    this.isPrimary = isPrimary;
  }
}
