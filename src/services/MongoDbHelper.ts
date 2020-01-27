import mongoose from 'mongoose';

import { Character, CharacterSchema, ICharacter } from '../models/ICharacter';
import { IServerClaims, ServerClaims } from '../models/IServerClaims';

mongoose.connect('mongodb://localhost/bobo-waifubot', { useNewUrlParser: true, useUnifiedTopology: true });

const disconnect = () => {
  mongoose.disconnect();
};

const writeWaifuToDb = (waifuData: ICharacter) => new Character({ ...waifuData }).save();

const fetchRandomWaifuFromDb = () => Character.aggregate([{ $sample: { size: 1 } }]).exec();

const findWaifuForName = (name: string) => Character.find({ name });

const fetchClaimStatusFromDb = (
  serverId: string, characterId: string,
) => ServerClaims.findOne({ serverId, characterId }).exec();
const writeClaimStatusToDb = (
  serverClaimData: {ownerId: string, serverId:string, characterId: string},
) => new ServerClaims({ ...serverClaimData }).save();

export default {
  writeWaifuToDb,
  fetchRandomWaifuFromDb,
  findWaifuForName,
  fetchClaimStatusFromDb,
  writeClaimStatusToDb,
  disconnect,
};
