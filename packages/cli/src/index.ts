#!/usr/bin/env node

import build from './esbuild';
import create from './create';
import dev from './dev';

const main = () => {
  const [script, type] = process.argv.slice(2);

  switch (script) {
    case 'create':
      return create();
    case 'build':
      return build(type);
    case 'dev':
      return dev(type);
    default:
      console.log("Script must be 'create' | 'build' | 'dev' ");
  }
};
main();
