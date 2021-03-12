export class Node {
  id: string;
  name: string;
  children: Node[] = [];
  data: unknown;
  parent?: Node;

  constructor(id: string, name: string, children: Node[] = []) {
    this.id = id;
    this.name = name;
    this.children = children;
  }

  toString() {
    return this.name;
  }
}
