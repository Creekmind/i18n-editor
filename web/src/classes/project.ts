import { array, string } from '@cmind/class-mapper/decorators';
import { Language } from '@/classes/language';

export class Project {
  @string()
  id: string;

  @string()
  name: string;

  @array(Language)
  languages: Language[] = [];

  constructor(id = '', name = '') {
    this.id = id;
    this.name = name;
    this.languages = [];
  }

  toString() {
    return this.name;
  }
}
