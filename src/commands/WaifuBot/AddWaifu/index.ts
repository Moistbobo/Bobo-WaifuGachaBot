import { Command } from '../../../models/Command';
import action from './action';

const AddWaifu: Command = {
  action,
  triggers: ['addwaifu', 'aw'],
  name: 'Add Waifu',
};

export default AddWaifu;
