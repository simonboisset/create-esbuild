import devClient from './client';
import devLibrary from './library';

const dev = (type: string) => {
  switch (type) {
    case 'library':
      return devLibrary();
    case 'client':
      return devClient();
    default:
      console.log('Dev type muste be library');
  }
};

export default dev;
