#! /usr/bin/env node

'use strict';

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

const directories = getDirectories(options.path);

const gitDirectories = directories.filter((dir) => hasDirectory(dir, GIT_DIR));

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
