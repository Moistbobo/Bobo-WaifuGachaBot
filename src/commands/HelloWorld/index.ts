import action from './action';
import { ICommand } from '../../models/ICommand';

const HelloWorld: ICommand = {
  name: 'Hello world',
  triggers: ['helloWorld', 'hw'],
  description: 'Hello world!',
  action,
};

export default HelloWorld;
