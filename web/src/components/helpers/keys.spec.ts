import { jsonToKeyTranslations, keyTranslationsToJSON, mergeKeys } from '@/components/helpers/keys';
import { Translations } from '@/classes/translations';
import { Translation } from '@/classes/translation';

test('keyTranslationsToJSON', () => {
  const translations = [
    new Translations('common.form.button.ok', '', [new Translation('en', 'OK')]),
    new Translations('common.form.button.cancel', '', [new Translation('en', 'Cancel')]),
    new Translations('common.list.ordering.asc', '', [new Translation('en', 'ASC')]),
    new Translations('common.list.ordering.desc', '', [new Translation('en', 'DESC')])
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const json = keyTranslationsToJSON(translations, 'en') as any;

  expect(json.common.form.button.ok).toBe('OK');
  expect(json.common.form.button.cancel).toBe('Cancel');
});

test('jsonToKeyTranslations', () => {
  const json = {
    common: {
      form: {
        button: {
          ok    : 'OK',
          cancel: 'Cancel'
        }
      }
    }
  }

  const translations = jsonToKeyTranslations(json, 'en');
  console.log(translations);
});

test('mergeKeys', () => {
  const en = [
    new Translations('common.form.button.ok', '', [new Translation('en', 'OK')]),
    new Translations('common.form.button.cancel', '', [new Translation('en', 'Cancel')]),
  ];

  const ru = [
    new Translations('common.form.button.ok', '', [new Translation('ru', 'Принять')]),
    new Translations('common.form.button.cancel', '', [new Translation('ru', 'Отмена')])
  ];

  const fr = [
    new Translations('common.form.button.ok', '', [new Translation('fr', 'OK')]),
    new Translations('common.form.button.cancel', '', [new Translation('fr', 'l\' annihilation')])
  ];

  const keys = mergeKeys(en, ru, fr);
  expect(keys.length).toBe(2)
  expect(keys[0].translations[0].language).toBe('en')
  expect(keys[0].translations[0].value).toBe('OK')
  expect(keys[0].translations[1].language).toBe('ru')
  expect(keys[0].translations[1].value).toBe('Принять')
  expect(keys[0].translations[2].language).toBe('fr')
  expect(keys[0].translations[2].value).toBe('OK')
});
