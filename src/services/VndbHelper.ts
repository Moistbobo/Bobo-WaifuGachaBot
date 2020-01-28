import vndb from 'vndb';
import { VndbVnData } from '../models/VndbVnData';

const client = vndb.createClient();
client.login();

const closeVndbClient = () => client.end();

const getVnWithTitle = (
  title: string,
) => new Promise<VndbVnData|null>((resolve, reject) => {
  client.vn({ filters: `title="${title}"` })
    .then((response: any) => {
      const { data: { items } } = response;
      if (items.length > 0) resolve(items[0]);
      else resolve(null);
    })
    .catch((err: Error) => {
      reject(new Error(err.message));
    });
});

export default {
  closeVndbClient,
  getVnWithTitle,
};
