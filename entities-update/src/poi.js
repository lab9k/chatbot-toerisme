class Poi {
  constructor (json) {
    this.json = json;
    this._names = json.name;
  }

  name (lang) {
    if (!this._names[lang]) {
      switch (lang) {
        case 'nl':
          this._names[lang] = ['geen naam'];
          break;
        case 'fr':
          this._names[lang] = ['pas de nom'];
          break;
        case 'es':
          this._names[lang] = ['sin nombre'];
          break;
        case 'de':
          this._names[lang] = ['kein name'];
          break;
        case 'en':
          this._names[lang] = ['no name'];
          break;
      }
    }
    return this._names[lang][0];
  }
}

module.exports = Poi;
