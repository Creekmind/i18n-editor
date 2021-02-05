import { boolean, string } from '@cmind/class-mapper/decorators';

export class Language {
  @string()
  iso: string;

  data: { [key: string]: string } = {};

  @boolean()
  isPrimary = false;

  constructor(iso: string) {
    this.iso = iso;
  }
}
