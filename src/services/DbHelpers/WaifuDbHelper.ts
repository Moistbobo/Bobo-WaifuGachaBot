import mongoose from 'mongoose';

import { Character, ICharacter } from '../../models/ICharacter';
import { ServerClaims } from '../../models/IServerClaims';

mongoose.connect('mongodb://localhost/bobo-waifubot', { useNewUrlParser: true, useUnifiedTopology: true });

const disconnect = () => {
  mongoose.disconnect();
};

const writeWaifuToDb = (waifuData: ICharacter) => new Character({ ...waifuData }).save();

const fetchRandomWaifuFromDb = () => Character.aggregate([{ $sample: { size: 1 } }]).exec();

const fetchCharactersById = (ids: string[]) => Character.find({
  _id: {
    $in: ids.map((id) => mongoose.Types.ObjectId(id)),
  },
});

const findWaifuForName = (
  name: string,
) => Character.find({ name: { $regex: new RegExp(`^.*${name.toLowerCase()}.*`, 'i') } });

const findWaifuInSeries = (
  series: string,
) => Character.find({ series: { $regex: new RegExp(`^${series.toLowerCase()}`, 'i') } });

const fetchClaimStatusFromDb = (
  serverId: string, characterId: string,
) => ServerClaims.findOne({ serverId, characterId }).exec();
const writeClaimStatusToDb = (
  serverClaimData: {ownerId: string; serverId: string; characterId: string, seriesName: string},
) => new ServerClaims({ ...serverClaimData }).save();

const fetchClaimedWaifuForSeries = (
  series: string,
) => ServerClaims.find({ seriesName: { $regex: new RegExp(`^${series.toLowerCase()}`, 'i') } });

const fetchClaimedWaifuForServer = (
  serverId: string,
) => ServerClaims.find({ serverId });

const fetchUserClaimedWaifuForServer = (
  userId: string,
  serverId: string,
) => ServerClaims.find({ serverId, ownerId: userId });

export default {
  writeWaifuToDb,
  fetchRandomWaifuFromDb,
  findWaifuForName,
  findWaifuInSeries,
  fetchClaimStatusFromDb,
  writeClaimStatusToDb,
  fetchClaimedWaifuForSeries,
  fetchClaimedWaifuForServer,
  fetchUserClaimedWaifuForServer,
  fetchCharactersById,
  disconnect,
};
