const { fetch, } = require('./util/util');
const BASE_URL = 'https://api.dialogflow.com/v1/entities?v=20150910';

class App {
  launch (pois) {
    this._pois = pois;
    this._langs = ['nl', 'en', 'fr', 'de', 'es'];
    this._listEntityTypes().then(entities => {
      const plaatsenEntity = entities.find(el => el.name === 'Plaatsen');
      if (!plaatsenEntity) throw new Error('Plaatsen Entity does not exist');

      this.langs.forEach(l => {
        this._listEntriesForLang(plaatsenEntity.id, l).then(entry => {
          const newEntries = [];
          this.pois.forEach(poi => {
            const index = entry.entries.findIndex(
              el => el.name === poi.name(l)
            );
            const newIndex = newEntries.findIndex(
              el => el.value === poi.name(l)
            );
            if (index < 0 && newIndex < 0) {
              newEntries.push({
                value: poi.name(l),
                synonyms: this._getSynonymsForPoi(poi),
              });
            }
          });
          this._postNewEntries(plaatsenEntity.id, newEntries, l);
        });
      });
    });
  }

  get pois () {
    return [...this._pois];
  }

  get langs () {
    return [...this._langs];
  }

  _getSynonymsForPoi (poi) {
    const ret = [];
    this.langs.forEach(lang => {
      ret.push(poi.name(lang));
    });
    return [...new Set(ret)];
  }

  _listEntriesForLang (entityID, lang) {
    const entriesUrl = `https://api.dialogflow.com/v1/entities/${entityID}?v=20150910&lang=${lang}`;
    return fetch(entriesUrl).then(data => ({
      ...data,
      lang,
    }));
  }

  _listEntityTypes () {
    return fetch(BASE_URL, {});
  }
  _postNewEntries (entityID, entries, lang) {
    console.log(lang, entries);
    const url = `https://api.dialogflow.com/v1/entities/${entityID}/entries?v=20150910&lang=${lang}`;
    const body = JSON.stringify(entries).replace(/’s/g, '');
    return fetch(url, {
      method: 'POST',
      body: body,
    }).catch(error => {
      console.log(error);
      console.log('entries: ', body);
    });
  }
}
module.exports = new App();
