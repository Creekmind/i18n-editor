export class Node {
  id: string;
  name: string;
  children: Node[] = [];
  data: unknown;
  parent?: Node;
  active = false;

  constructor(id: string, name: string, children: Node[] = []) {
    this.id = id;
    this.name = name;
    this.children = children;
  }

  toString() {
    return this.name;
  }

  findByID(id: string): Node | null {
    if (this.id === id) {
      return this;
    }

    for (const child of this.children) {
      const found = child.findByID(id);
      if (found) {
        return found
      }
    }

    return null;
  }

  activate(id: string) {
    this.active = this.id === id;

    for (const child of this.children) {
      child.activate(id);
    }
  }
}
