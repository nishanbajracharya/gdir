const { program } = require('commander');

const { getDirectories, hasDirectory } = require('./dir');

const GIT_DIR = '.git';

program
  .option('-p, --path <value>', 'Path of directory to check repos in', '.')
  .option('-b, --branch <value>', 'Git branch to filter', '')
  .parse();

const options = program.opts();

const directories = getDirectories(options.path);

const gitDirectories = directories.filter((dir) => hasDirectory(dir, GIT_DIR));

console.log(gitDirectories);
