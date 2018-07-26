class Poi {
  constructor (json) {
    this.json = json;
    this._names = json.name;
  }

  name (lang) {
    if (!this._names[lang] || this._names[lang].length === 0) {
      throw new Error(
        `Language '${lang}' is missing in poi: \n${JSON.stringify(this.json)}`
      );
    }
    return this._names[lang][0];
  }
}

module.exports = Poi;
