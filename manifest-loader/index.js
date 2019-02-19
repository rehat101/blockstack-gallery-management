const getOptions = require('loader-utils').getOptions;

module.exports = function(source) {

  const options = getOptions(this);

  if(!options.production) {
    return this.emitFile('manifest.json', source);
  }

  const merged = Object.assign({}, JSON.parse(source));

  merged.start_url = options.production.start_url;
  merged.icons[0].src = options.production.icon_src;

  const mergedJSON = JSON.stringify(merged);

  this.emitFile('manifest.json', mergedJSON);

  return mergedJSON;
};
