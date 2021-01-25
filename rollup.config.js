export default {
  input: {
    cli: 'index.js',
    git: 'git.js',
    dir: 'dir.js'
  },
  output: {
    dir: 'dist',
    format: 'cjs',
    chunkFileNames: '[name].js',
    banner: '#! /usr/bin/env node\n',
  },
  external: ['chalk', 'commander', 'cli-table', 'path', 'fs', 'child_process'],
};
