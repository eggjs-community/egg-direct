'use strict';

const FileLoader = require('egg-core/lib/loader/file_loader');

/** Here is a new method for loading controllers on egg-core's FileLoader prototype method.
 * @return {Array} - parse
*/
FileLoader.prototype.loadPlain = function() {
  return this.parse();
};

module.exports = FileLoader;
