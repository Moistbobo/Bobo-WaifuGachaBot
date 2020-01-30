import action from './action';
import { ICommand } from '../../../models/ICommand';

const Timely: ICommand = {
  action,
  name: 'Timely',
  triggers: ['timely', 't'],
  description: 'Collect daily pay',
};

export default Timely;
