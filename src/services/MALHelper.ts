import Mal from 'node-myanimelist';
import { MALMangaData } from '../models/MALMangaData';

const getMangaWithTitle = (title: string) => new Promise<MALMangaData|null>((resolve, reject) => {
  Mal.search().manga({ q: title, limit: 1 })
    .then((response: any) => {
      const { data: { results } } = response;

      if (!results || results.length === 0) {
        resolve(null);
      }

      resolve(results[0]);
    })
    .catch((err) => {
      reject(new Error(err.message));
    });
});

export default {
  getMangaWithTitle,
};
