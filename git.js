const { execSync } = require('child_process');

function getCurrentBranch(path) {
  return execSync(`cd ${path} && git branch --show-current`).toString().trim();
}

module.exports = {
  getCurrentBranch,
};
