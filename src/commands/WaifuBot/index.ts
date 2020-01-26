import { ICommand } from '../../models/ICommand';
import AddWaifu from './AddWaifu';
import RollWaifu from './RollWaifu';
import ShowTemplate from './ShowTemplate';

const WaifuBotCommands: ICommand[] = [
  AddWaifu,
  RollWaifu,
  ShowTemplate,
];

export default WaifuBotCommands;
