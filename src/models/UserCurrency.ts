import {
  Document, Schema, Model, model,
} from 'mongoose';

export const initialUserCurrency = {
  userId: null,

  currencyAmt: 0,

  claimedDailyPay: false,

  rolledDaily: false,
};

export interface UserCurrency extends Document{
	userId: string;

	currencyAmt: number;

	claimedDailyPay: boolean;

	rolledDaily: boolean;
}

export interface UserCurrencyModel extends UserCurrency, Document{}

export const UserCurrencySchema: Schema = new Schema({
  userId: String,

  currencyAmt: Number,

  claimedDailyPay: Boolean,

  rolledDaily: Boolean,
});

export const UserCurrency: Model<UserCurrencyModel> = model<UserCurrencyModel>('UserCurrency', UserCurrencySchema);
