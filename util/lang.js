const fs = require('fs');
const path = require('path');

class Translator {
  constructor() {
    this.translations = {
      en: [],
      nl: [],
      es: [],
      de: [],
      fr: [],
    };
  }

  /**
   * adds a translation to
   *
   * @param {{key:string,lang:string,translation:string}} options
   * @memberof Translator
   */
  addTranslation(options) {
    const { key, translation } = options;
    this.translations[options.lang].push({ key, translation });
  }

  translate(lang, key) {
    const translation = this.translations[lang].find(l => l.key === key);
    if (translation) {
      return translation.translation;
    }
    return null;
  }
}

/**
 * checks the given translator for missing translations
 *
 * @param {Translator} translator
 */
const check = translator => {
  const languages = Object.keys(translator.translations);
  const missing = [];
  languages.forEach(l => {
    const lang = translator.translations[l];
    const others = languages.filter(la => l !== la);
    lang.forEach(value => {
      others.forEach(other => {
        if (!translator.translations[other].find(el => el.key === value.key)) {
          if (
            missing.findIndex(el => el.key === value.key && el.lang === other) <
            0
          ) {
            missing.push({ key: value.key, lang: other });
          }
        }
      });
    });
  });
  return missing;
};

module.exports = (() => {
  const translator = new Translator();
  const root = path.dirname(require.main.filename);
  const p = path.join(root, '..', 'util', 'translations');

  const files = fs.readdirSync(p, 'utf8');
  files.forEach(file => {
    const data = fs.readFileSync(p + '/' + file, 'utf8');
    const lang = file.split('.')[0];
    const json = JSON.parse(data);
    const keys = Object.keys(json);
    keys.forEach(key => {
      translator.addTranslation({
        key: key,
        lang: lang,
        translation: json[key],
      });
    });
  });

  // check for not translated strings
  const missing = check(translator);
  if (missing.length !== 0) {
    console.warn('Missing translations found');
    console.warn(JSON.stringify(missing, null, '  '));
  }

  return translator;
})();

module.exports.check = check;

module.exports.detectLang = (req, res, next) => {
  const {
    body: { queryResult },
  } = req;
  if (queryResult && queryResult.parameters && queryResult.parameters.lang) {
    const {
      parameters: { lang },
    } = queryResult;
    console.log(`Lang parameter was: ${lang}`);
    req.language = lang;
  } else {
    console.log(`lang was not found: ${JSON.stringify(queryResult)}`);
    req.language = 'nl';
  }
  next();
};
