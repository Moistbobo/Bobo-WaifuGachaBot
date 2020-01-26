import {
  Document, Schema, Model, model,
} from 'mongoose';

export interface ICharacter{
	name: string;

	series: string;

	gender: string;

	image: string;

	meta: string;
}

export interface ICharacterModel extends ICharacter, Document{}

export const CharacterSchema: Schema = new Schema({
  name: String,

  series: String,

  gender: String,

  image: String,

  meta: String,
});


export const Character: Model<ICharacterModel> = model<ICharacterModel>('Character', CharacterSchema);
