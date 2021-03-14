import { Node } from '@/components/tree/classes/node';
import { Translations } from '@/classes/translations';

export const keyDelimiter = '.';

const createBranch = (path: string[], directParent: Node, cache: Map<string, Node>) => {
  path.forEach((name, index) => {
    const nodePath = path.slice(0, index + 1);
    const id = nodePath.join(keyDelimiter);

    let node: Node;
    if (cache.has(id)) {
      node = cache.get(id) as Node;
    } else {
      node = new Node(id, nodePath[nodePath.length - 1]);
      cache.set(node.id, node);
    }

    if (!directParent.children.find(c => c.id === node.id)) {
      directParent.children.push(node);
    }
    directParent = node;
  });
};

export const keyTranslationsToTree = (keys: Translations[]): Node => {
  const root = new Node('', 'root');
  const cache = new Map<string, Node>();

  keys.forEach((translations: Translations) => {
    const key = translations.id; // 'common.form.ok'
    const path = key.split(keyDelimiter); // ['common', 'form', 'ok']
    createBranch(path, root, cache);
  });

  return root;
};
