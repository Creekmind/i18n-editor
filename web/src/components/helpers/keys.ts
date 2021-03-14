import { Translations } from '@/classes/translations';
import { setWith } from 'lodash';
import { Translation } from '@/classes/translation';

export const keyTranslationsToJSON = (keys: Translations[], language: string) => {
  const json = {};
  keys.forEach(key => {
    const translation = key.translations.find(t => t.language === language);

    if (!translation) {
      return;
    }

    setWith(json, key.id, translation.value, Object);
  });
  return json;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const jsonToKeyTranslations = (json: any, language: string): Translations[] => {
  const translations: Translations[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dig = (json: any, path: string[]) => {
    Object.keys(json).forEach((key) => {
      path.push(key);
      const value = json[key];
      if (typeof value === 'object') {
        dig(value, path);
      } else {
        translations.push(new Translations(path.join('.'), '', [
          new Translation(language, value)
        ]));
      }
      path.pop();
    });
  };

  dig(json, []);
  return translations;
};

export const mergeKeys = (...translations: Translations[][]): Translations[] => {
  const target = translations[0];

  if (translations.length < 2) {
    return target;
  }

  const cache = new Map<string, Translation[]>();
  translations.forEach(key => {
    key.forEach(k => {
      k.translations.forEach(translation => {
        let translations = cache.get(k.id);
        if (!translations) {
          translations = [];
          cache.set(k.id, translations);
        }

        const existingTranslation = translations.find(t => t.language === translation.language);
        if (!existingTranslation) {
          translations.push(new Translation(translation.language, translation.value))
        }
      });
    });
  });

  target.forEach(targetKey => {
    targetKey.translations = cache.get(targetKey.id) || [];
  });

  return target;
}
