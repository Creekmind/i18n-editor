import { keyTranslationsToTree } from '../helpers/tree';
import { Translations } from '@/classes/translations';

test('keyTranslationsToTree', () => {
  const translations = [
    new Translations('common.form.button.ok', ''),
    new Translations('common.form.button.cancel', ''),
    new Translations('common.list.ordering.asc', ''),
    new Translations('common.list.ordering.desc', '')
  ];

  const root = keyTranslationsToTree(translations);

  expect(root.children.length).toBe(1);
  expect(root.children[0].name).toBe('common');
  expect(root.children[0].children.length).toBe(2);
  expect(root.children[0].children[0].name).toBe('form');
  expect(root.children[0].children[0].children.length).toBe(1);
  expect(root.children[0].children[1].children.length).toBe(1);
  expect(root.children[0].children[0].children[0].name).toBe('button');
  expect(root.children[0].children[0].children[0].children.length).toBe(2);
  expect(root.children[0].children[1].children[0].children.length).toBe(2);
});
