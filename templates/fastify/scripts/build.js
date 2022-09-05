const esbuild = require('esbuild');
const { config } = require('dotenv');
const fse = require('fs-extra');

const build = async () => {
  config();
  if (fse.existsSync('dist')) {
    await fse.rm('dist', { recursive: true });
  }

  const serverEnv = { 'process.env.NODE_ENV': `'production'` };

  for (const key in process.env) {
    serverEnv[`process.env.${key}`] = `'${process.env[key]}'`;
  }

  esbuild
    .build({
      entryPoints: ['src/index.ts'],
      bundle: true,
      outfile: 'dist/index.js',
      platform: 'node',
      define: serverEnv,
    })
    .catch(() => process.exit(1));
};

build();
