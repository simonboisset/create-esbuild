import esbuild from 'esbuild';
import { nodeExternalsPlugin } from 'esbuild-node-externals';

const buildLibrary = () => {
  esbuild.build({
    entryPoints: ['./src/index.ts'],
    outfile: 'dist/index.js',
    bundle: true,
    minify: true,
    treeShaking: true,
    platform: 'node',
    format: 'cjs',
    target: 'node14',
    plugins: [nodeExternalsPlugin()],
  });
};

export default buildLibrary;
