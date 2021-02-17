export class Node {
  name!: string;
  children: Node[] = [];

  constructor(name: string, children: Node[] = []) {
    this.name = name;
    this.children = children;
  }

  toString() {
    return this.name;
  }
}
