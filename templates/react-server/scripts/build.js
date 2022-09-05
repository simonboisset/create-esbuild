const esbuild = require('esbuild');
const { config } = require('dotenv');
const fse = require('fs-extra');

const build = async () => {
  config();
  if (fse.existsSync('dist')) {
    await fse.rm('dist', { recursive: true });
  }
  await fse.copy('./public', 'dist/public');
  const serverEnv = { 'process.env.NODE_ENV': `'production'` };
  const clientEnv = { 'process.env.NODE_ENV': `'production'` };
  for (const key in process.env) {
    if (key.indexOf('SERVER_') === 0) {
      serverEnv[`process.env.${key}`] = `'${process.env[key]}'`;
    }
    if (key.indexOf('CLIENT_') === 0) {
      serverEnv[`process.env.${key}`] = `'${process.env[key]}'`;
      clientEnv[`process.env.${key}`] = `'${process.env[key]}'`;
    }
  }
  esbuild
    .build({
      entryPoints: ['src/client/index.tsx'],
      bundle: true,
      minify: true,
      define: clientEnv,
      loader: { '.png': 'file', '.svg': 'file' },
      outfile: 'dist/public/index.js',
    })
    .catch(() => process.exit(1))
    .then(() => {
      esbuild
        .build({
          entryPoints: ['src/index.ts'],
          bundle: true,
          outfile: 'dist/index.js',
          platform: 'node',
          define: serverEnv,
        })
        .catch(() => process.exit(1));
    });
};

build();
