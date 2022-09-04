import esbuild from 'esbuild';
import { config } from 'dotenv';

const buildClient = () => {
  config();
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
    outfile: 'dist/index.js',
  });
};

export default buildClient;
