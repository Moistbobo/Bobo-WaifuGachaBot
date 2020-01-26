import { ICommand } from '../../../models/ICommand';
import action from './action';

const ShowTemplate: ICommand = {
  action,
  triggers: ['st', 'showtemplate', 'template'],
  description: 'Show basic template for adding waifus',
  name: 'Show Template',
};

export default ShowTemplate;
