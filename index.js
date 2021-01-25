const { program } = require('commander');

program
  .option('-p, --path <type>', 'Path of directory to check repos in', '.')
  .option('-b, --branch <type>', 'Git branch to filter', '');

program.parse(process.argv);

const options = program.opts();

console.log(options);