import { ICommand } from '../../../models/ICommand';
import action from './action';

const RollWaifu: ICommand = {
  action,
  triggers: ['rollwaifu', 'w', 'rw'],
  description: 'Roll a random character',
  name: 'Roll Waifu',
};

export default RollWaifu;
