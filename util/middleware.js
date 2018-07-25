const idMiddleWare = (req, res, next) => {
  if (!req.query.id) return res.json({ error: 'id url was not specified' });
  req.poi_id = req.query.id;
  return next();
};

const langMiddleWare = (req, res, next) => {
  const lang = req.body.queryResult.languageCode;
  if (!lang) return res.json({ error: 'something went wrong' });
  switch (lang.toLowerCase()) {
    case 'nl':
      req.loc = 'nl';
      break;
    case 'en':
      req.loc = 'en';
      break;
    case 'fr':
      req.loc = 'fr';
      break;
    case 'de':
      req.loc = 'de';
      break;
    case 'es':
      req.loc = 'es';
      break;
    default:
      req.loc = 'en';
      req.error = 'Language was not found, defaulting to English';
      break;
  }
  return next();
};

const typeMiddleware = (req, res, next) => {
  const qResult = req.body.queryResult;
  if (qResult) {
    switch (qResult.action) {
      case 'get_nearby_poi':
        req.type = 'nearby_poi';
        break;
      case 'get_nearest_poi':
        req.type = 'nearest_poi';
        break;
      case 'get_categories':
        req.type = 'categories';
        break;
      default:
        req.type = 'None';
        break;
    }
    return next();
  }
  return next(new Error('No queryResult provided.'));
};

module.exports = {
  idMiddleWare,
  langMiddleWare,
  typeMiddleware,
};
