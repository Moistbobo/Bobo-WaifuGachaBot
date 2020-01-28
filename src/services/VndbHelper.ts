import vndb from 'vndb';
import { VndbVnData } from '../models/VndbVnData';

const client = vndb.createClient();
client.login();

const closeVndbClient = () => client.end();

const getVnWithTitle = (
  title: string,
) => new Promise<VndbVnData>((resolve, reject) => {
  client.vn({ filters: `title="${title}"` })
    .then((response: any) => {
      const { data: { items } } = response;
      resolve(items[0]);
    })
    .catch((err: Error) => {
      reject(new Error(err.message));
    });
});

export default {
  closeVndbClient,
  getVnWithTitle,
};
