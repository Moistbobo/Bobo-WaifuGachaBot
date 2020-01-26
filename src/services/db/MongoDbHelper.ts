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

const rollWaifu = () => Character.findOne();

export default {
  saveWaifu,
  rollWaifu,
  disconnect,
};
