import { ICommandArgs } from './ICommandArgs';

export interface ICommand {
    name: string;
    triggers: string[];
    description: string;
    action: (args:ICommandArgs) => any| void;
}
