import { ICommand } from '../../../models/ICommand';
import action from './action';

const WaifuInfo: ICommand = {
  action,
  name: 'Waifu Info',
  triggers: ['im', 'wi', 'info'],
  description: 'Show information for specified waifu',
};

export default WaifuInfo;
