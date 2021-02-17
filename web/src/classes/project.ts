import { any, array, string } from '@cmind/class-mapper/decorators';
import { Language } from '@/classes/language';
import { DataObject } from '@/classes/base/data-object';
import { Translation } from '@/classes/translation';

export class Project extends DataObject {
  @string()
  name: string;

  @array(Language)
  languages: Language[] = [];

  @any()
  translations: { [key: string]: Translation[] } = {}

  constructor(id = '', name = '') {
    super(id);
    this.name = name;
    this.languages = [];
  }

  toString() {
    return this.name;
  }
}
