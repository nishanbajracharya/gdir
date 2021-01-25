const { execSync } = require('child_process');

function getCurrentBranch(path) {
  return execSync(`cd ${path} && git branch --show-current`).toString().trim();
}

function isBranch(path, branch) {
  const currentBranch = getCurrentBranch(path);

  return currentBranch.includes(branch);
}

module.exports = {
  isBranch,
  getCurrentBranch,
};
