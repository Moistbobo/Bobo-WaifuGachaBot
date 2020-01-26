import action from './action';
import { ICommand } from '../../models/ICommand';

const HelloWorld: ICommand = {
  name: 'Hello world',
  triggers: ['helloWorld', 'hw'],
  action,
};

export default HelloWorld;
