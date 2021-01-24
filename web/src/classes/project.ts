import { string } from '@cmind/class-mapper/decorators';

export class Project {

  @string()
  id: string;

  @string()
  name: string;

  constructor(id = '', name = '') {
    this.id = id;
    this.name = name;
  }

  toString() {
    return this.name;
  }

}
