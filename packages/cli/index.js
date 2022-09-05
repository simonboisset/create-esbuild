import fse from 'fs-extra';
import gunzip from 'gunzip-maybe';
import inquirer from 'inquirer';
import fetch from 'node-fetch';
import stream from 'stream';
import tar from 'tar-fs';
import { promisify } from 'util';

const templates = [
  { name: 'Just a library', value: 'library' },
  { name: 'A react library', value: 'react-library' },
  { name: 'Express server', value: 'express' },
  { name: 'Fastify server', value: 'fastify' },
  { name: 'React and server fullstack app', value: 'react-server' },
  { name: 'React and serverless fullstack app', value: 'react-serverless' },
  { name: 'React single page app', value: 'react-spa' },
  { name: 'Monorepo with Remix app, library and React-native mobile app', value: 'monorepo' },
  { name: 'Monorepo with muliple libraries to publish', value: 'monorepo-library' },
];

const reposUrl = 'https://api.github.com/repos/simonboisset/create-esbuild/tarball';
const pipeline = promisify(stream.pipeline);

const create = async () => {
  try {
    const { dir, template } = await inquirer.prompt([
      {
        type: 'input',
        name: 'dir',
        message: 'Where would you like to create your template?',
        default: '.',
      },
      {
        name: 'template',
        type: 'list',
        choices: templates,
        default: 'library',
        message: 'Which template do you want?',
      },
    ]);

    const response = await fetch(reposUrl);
    if (!response.body) {
      throw new Error('Template fetch body is empty');
    }
    try {
      await pipeline(
        response.body.pipe(gunzip()),
        tar.extract('./temp', {
          map(header) {
            header.name = 'repo/' + header.name.split('/').slice(1).join('/');
            return header;
          },
          ignore(_filename, header) {
            if (!header) {
              throw new Error(`Header is undefined`);
            }
            return header.name === '__IGNORE__';
          },
        }),
      );
    } catch (_) {
      throw Error(
        '🚨 There was a problem extracting the file from the provided template.\n\n' +
          `  Template URL: \`${reposUrl}\`\n`,
      );
    }
    await fse.copy(`./temp/repo/templates/${template}`, dir);
    await fse.rm('temp', { recursive: true });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

create();
