import { string } from '@cmind/class-mapper/decorators';

export class Translation {
  @string()
  language: string;

  @string()
  value: string;

  constructor(language: string, value = '') {
    this.language = language;
    this.value = value;
  }
}
