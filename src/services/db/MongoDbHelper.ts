import mongoose from 'mongoose';

import { Character, CharacterSchema } from '../../models/ICharacter';

mongoose.connect('mongodb://localhost/bobo-waifubot', { useNewUrlParser: true, useUnifiedTopology: true });

const saveWaifu = (waifuData:any) => {
  const newCharacter = new Character({
    ...waifuData,
  });

  return newCharacter.save();
};

const disconnect = () => {
  mongoose.disconnect();
};

const rollWaifu = () => Character.aggregate([{ $sample: { size: 1 } }]).exec();

const findWaifuForName = (name: string) => Character.find({ name });

export default {
  saveWaifu,
  rollWaifu,
  findWaifuForName,
  disconnect,
};
