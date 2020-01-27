import { ICommand } from '../../models/ICommand';
import AddWaifu from './AddWaifu';
import RollWaifu from './RollWaifu';
import ShowTemplate from './ShowTemplate';
import WaifuInfo from './WaifuInfo';

const WaifuBotCommands: ICommand[] = [
  AddWaifu,
  RollWaifu,
  WaifuInfo,
  ShowTemplate,
];

export default WaifuBotCommands;
