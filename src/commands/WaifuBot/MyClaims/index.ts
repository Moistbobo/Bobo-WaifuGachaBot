import { ICommand } from '../../../models/ICommand';
import action from './action';

const MyClaims: ICommand = {
  action,
  name: 'My Claims',
  triggers: ['mc', 'myClaims'],
  description: 'Check your claimed characters',
};

export default MyClaims;
