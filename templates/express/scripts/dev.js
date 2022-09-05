const { spawn } = require('child_process');
const { config } = require('dotenv');
const esbuild = require('esbuild');
const { request, createServer } = require('http');

const dev = async () => {
  config();

  const serverEnv = { 'process.env.NODE_ENV': `'dev'` };

  const clients = [];

  Object.keys(process.env).forEach((key) => {
    serverEnv[`process.env.${key}`] = `'${process.env[key]}'`;
  });

  const openBrowser = () => {
    setTimeout(() => {
      const op = { darwin: ['open'], linux: ['xdg-open'], win32: ['cmd', '/c', 'start'] };
      if (clients.length === 0) spawn(op[process.platform][0], ['http://localhost:3000']);
    }, 1000);
  };

  esbuild
    .build({
      entryPoints: ['src/index.ts'],
      bundle: true,
      outfile: 'dist/index.js',
      platform: 'node',
      define: serverEnv,
      sourcemap: 'inline',
      watch: {
        onRebuild: (error) => {
          console.log(error || 'server rebuilt');
        },
      },
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

dev();
