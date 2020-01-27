import {
  Document, Schema, Model, model,
} from 'mongoose';

export interface IServerClaims extends Document{
	characterId: string;

	serverId: string;

	ownerId: string;

}

export interface IServerClaimsModel extends IServerClaims, Document{}

export const ServerClaimsSchema: Schema = new Schema(
  {
    characterId: String,

    serverId: String,

    ownerId: String,
  },
);

export const ServerClaims: Model<IServerClaimsModel> = model<IServerClaimsModel>('ServerClaims', ServerClaimsSchema);
