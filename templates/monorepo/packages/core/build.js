const esbuild = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');
const [mode] = process.argv.slice(2);
esbuild
  .build({
    entryPoints: ['./src/index.ts'],
    outfile: 'dist/index.js',
    bundle: true,
    minify: true,
    treeShaking: true,
    platform: 'node',
    format: 'cjs',
    target: 'node14',
    watch: mode === '-w',
    plugins: [nodeExternalsPlugin()],
  })
  .catch(() => process.exit(1));
