#! /usr/bin/env node

const chalk = require('chalk');
const Table = require('cli-table');
const { program, Option } = require('commander');

const { getStatus, getCurrentBranch, isBranch } = require('./git');
const {
  hasDirectory,
  getDirectories,
  getDirectoryNameFromPath,
} = require('./dir');

const GIT_DIR = '.git';

try {
  program
    .option('-p, --path <value>', 'Path of directory to check repos in', '.')
    .option('-b, --branch <value>', 'Git branch to filter', '')
    .addOption(
      new Option('-t, --type <value>', 'Show current branch or status')
        .choices(['branch', 'status'])
        .default('branch')
    )
    .parse();

  const options = program.opts();

  program
    .arguments('[path] [branch]')
    .description('Arguments', {
      path: 'Path of directory to check repos in',
      branch: 'Git branch to filter',
    })
    .action((path, branch) => {
      if (path) {
        options.path = path;
      }

      if (branch) {
        options.branch = branch;
      }
    })
    .parse();

  const directories = getDirectories(options.path);

  const gitDirectories = directories.filter((dir) =>
    hasDirectory(dir, GIT_DIR)
  );

  const filteredDirectories = gitDirectories.filter((dir) =>
    isBranch(dir, options.branch)
  );

  function display(type) {
    const table = new Table();

    filteredDirectories.forEach((dir) =>
      table.push([
        chalk.bold.green(getDirectoryNameFromPath(dir)),
        type === 'status' ? getStatus(dir) : getCurrentBranch(dir),
      ])
    );

    console.log(table.toString());
  }

  display(options.type);
} catch (e) {
  console.log(
    chalk.bold.redBright('An error occured! Make sure your path is correct.')
  );

  const table = new Table();

  table.push([e.message]);
  console.log(table.toString());
}
