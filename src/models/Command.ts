import { CommandArgs } from './CommandArgs';

export interface Command {
    name: string;
    triggers: string[];
    action: (args:CommandArgs) => any| void;
}
