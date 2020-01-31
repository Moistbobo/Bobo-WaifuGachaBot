import { ICommand } from '../../models/ICommand';
import AddWaifu from './AddWaifu';
import RollWaifu from './RollWaifu';
import ShowTemplate from './ShowTemplate';
import WaifuInfo from './WaifuInfo';
import SeriesInfo from './SeriesInfo';
import MyClaims from './MyClaims';

const WaifuBotCommands: ICommand[] = [
  AddWaifu,
  RollWaifu,
  WaifuInfo,
  ShowTemplate,
  SeriesInfo,
  MyClaims,
];

export default WaifuBotCommands;
