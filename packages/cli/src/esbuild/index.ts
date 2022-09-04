import buildClient from './client';
import devLibrary from './library';

const build = (type: string) => {
  switch (type) {
    case 'library':
      return devLibrary();
    case 'client':
      return buildClient();
    default:
      console.log('Dev type muste be library');
  }
};

export default build;
