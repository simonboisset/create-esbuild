#!/usr/bin/env node

const esbuild = require('esbuild');
esbuild
  .build({
    entryPoints: ['./src/index.ts'],
    outfile: 'dist/index.js',
    bundle: true,
    minify: true,
    treeShaking: true,
    platform: 'node',
    format: 'cjs',
    target: 'node16',
    external: ['esbuild'],
  })
  .catch(() => process.exit(1));
