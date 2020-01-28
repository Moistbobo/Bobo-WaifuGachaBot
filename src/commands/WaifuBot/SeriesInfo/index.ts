import { ICommand } from '../../../models/ICommand';
import action from './action';

const SeriesInfo: ICommand = {
  action,
  name: 'Series Info',
  triggers: ['si', 'seriesInfo'],
  description: 'List characters and information about a series',
};

export default SeriesInfo;
