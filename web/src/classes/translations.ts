import { array, string } from '@cmind/class-mapper/decorators';
import { DataObject } from '@/classes/base/data-object';
import { Translation } from '@/classes/translation';

export class Translations extends DataObject {
  @string()
  projectID: string;

  @array(Translation)
  translations: Translation[] = [];

  path = '';

  constructor(id = '', projectID: string, translations: Translation[] = []) {
    super(id);
    this.projectID = projectID;
    this.translations = translations;
  }
}
