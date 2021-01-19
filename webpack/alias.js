const path = require('path');
const tsConfig = require('../tsconfig.json');

function generateAliasFromTSPaths(paths) {
  return Object.entries(paths).reduce((aliases, [pathKey, pathValue]) => {
    const key = pathKey.split('/').shift();
    const value = pathValue.pop()
      .replace(/\/\*$/, '')
      .replace(/^\.\//, '');

    aliases[key] = path.resolve(__dirname, '..', value);
    return aliases;
  }, {});
}

module.exports = generateAliasFromTSPaths(tsConfig.compilerOptions.paths);