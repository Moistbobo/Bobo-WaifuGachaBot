import {
  Document, Schema, Model, model,
} from 'mongoose';

export interface ICharacter extends Document{
	name: string;

	nameJp?: string;

	nameAlt?: string[];

	series: string;

	gender: string;

	type: string;

	images: string[];

	meta: string;

}

export interface ICharacterModel extends ICharacter, Document{}

export const CharacterSchema: Schema = new Schema({
  name: String,

  nameJp: String,

  nameAlt: [String],

  type: String,

  series: String,

  gender: String,

  images: [String],

  meta: String,
});


export const Character: Model<ICharacterModel> = model<ICharacterModel>('Character', CharacterSchema);
