const esbuild = require('esbuild');
const { config } = require('dotenv');
const fse = require('fs-extra');

const build = async () => {
  config();
  if (fse.existsSync('dist')) {
    await fse.rm('dist', { recursive: true });
  }
  await fse.copy('./public', 'dist');
  const clientEnv = { 'process.env.NODE_ENV': `'production'` };
  for (const key in process.env) {
    if (key.indexOf('CLIENT_') === 0) {
      clientEnv[`process.env.${key}`] = `'${process.env[key]}'`;
    }
  }
  esbuild.build({
    entryPoints: ['src/index.tsx'],
    bundle: true,
    minify: true,
    define: clientEnv,
    loader: { '.png': 'file', '.svg': 'file' },
    outfile: 'dist/index.js',
  });
};

build();
