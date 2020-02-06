import { ICommand } from '../../../models/ICommand';
import action from './action';

const SeriesInfo: ICommand = {
  action,
  name: 'Series Info',
  triggers: ['si', 'seriesInfo'],
  description: 'List characters and information about a series. '
      + 'Additional -info tag can be specified to retrieve additional information from '
      + 'MAL or vndb.',
};

export default SeriesInfo;
