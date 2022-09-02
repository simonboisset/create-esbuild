import { fileURLToPath } from 'url';
import fse from 'fs-extra';
import fetch from 'node-fetch';
import { promisify } from 'util';
import stream from 'stream';
import gunzip from 'gunzip-maybe';
import tar from 'tar-fs';

const create = async () => {
  try {
    const pipeline = promisify(stream.pipeline);

    const reposUrl = 'https://api.github.com/repos/simonboisset/create-esbuild/tarball';
    const templates = {
      library: 'https://api.github.com/repos/simonboisset/remix-feature-routes/tarball',
      'react-library': 'fille://../templates/react-library/',
    };

    type Template = keyof typeof templates;
    const [template, projectDir] = process.argv as [Template, string];
    console.log(template, projectDir);

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
          `  Template URL: \`${reposUrl}\`\n` +
          `  Destination directory: \`${projectDir}\``,
      );
    }
    const templatePath = 'library';
    await fse.copy(`./temp/repo/templates/${templatePath}`, '.');
    await fse.rm('temp', { recursive: true });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default create;
