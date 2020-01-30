import { ICommand } from '../../../models/ICommand';
import AppConfig from '../../../AppConfig';
import action from './action';

const Bank: ICommand = {
  action,
  name: 'Bank',
  triggers: ['$', 'bank'],
  description: `Check the amount of ${AppConfig.currencyPlural} you have`,
};

export default Bank;
