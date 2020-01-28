import { ICommand } from '../../../models/ICommand';
import action from './action';

const Commands: ICommand = {
  action,
  name: 'Commands',
  triggers: ['commands', 'c'],
  description: 'List Available commands',
};

export default Commands;
