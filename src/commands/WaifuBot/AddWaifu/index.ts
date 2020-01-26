import { ICommand } from '../../../models/ICommand';
import action from './action';

const AddWaifu: ICommand = {
  action,
  triggers: ['addwaifu', 'aw'],
  description: 'Add a character to available gacha characters',
  name: 'Add Waifu',
};

export default AddWaifu;
