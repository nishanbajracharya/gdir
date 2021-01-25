const { program } = require('commander');

const { getCurrentBranch, isBranch } = require('./git');
const {
  getDirectories,
  hasDirectory,
  getDirectoryNameFromPath,
} = require('./dir');

const GIT_DIR = '.git';

program
  .option('-p, --path <value>', 'Path of directory to check repos in', '.')
  .option('-b, --branch <value>', 'Git branch to filter', '')
  .parse();

const options = program.opts();

const directories = getDirectories(options.path);

const gitDirectories = directories.filter((dir) => hasDirectory(dir, GIT_DIR));

const filteredDirectories = gitDirectories.filter(dir => isBranch(dir, options.branch));

filteredDirectories.forEach(dir => {
  console.log(getDirectoryNameFromPath(dir), getCurrentBranch(dir));
})