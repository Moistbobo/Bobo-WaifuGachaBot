import { ICommand } from '../../models/ICommand';
import AddWaifu from './AddWaifu';
import RollWaifu from './RollWaifu';
import ShowTemplate from './ShowTemplate';
import WaifuInfo from './WaifuInfo';
import SeriesInfo from './SeriesInfo';

const WaifuBotCommands: ICommand[] = [
  AddWaifu,
  RollWaifu,
  WaifuInfo,
  ShowTemplate,
  SeriesInfo,
];

export default WaifuBotCommands;
