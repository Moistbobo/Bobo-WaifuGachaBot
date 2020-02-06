import action from './action';
import { ICommand } from '../../../models/ICommand';

const ResetAllDailyPay: ICommand = {
  action,
  name: 'Reset all Daily Pay',
  triggers: ['resetTimely', 'rt'],
  description: 'Reset Timely pay status',
};

export default ResetAllDailyPay;
