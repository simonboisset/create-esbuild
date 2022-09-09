const esbuild = require('esbuild');
esbuild
  .build({
    entryPoints: ['./cron/cron.ts'],
    outdir: './.netlify/functions-internal/',
    minify: true,
    treeShaking: true,
    platform: 'node',
    format: 'cjs',
  })
  .catch(() => process.exit(1));
