const { readdirSync } = require('fs');
const path = require('path');

const getDirectories = (source, options = { fullPath: true }) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => {
      if (options.fullPath) {
        return path.resolve(source + '/' + dirent.name);
      }

      return dirent.name;
    });

const hasDirectory = (source, dir) =>
  !!readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
    .find((name) => name === dir);

module.exports = { getDirectories, hasDirectory };
