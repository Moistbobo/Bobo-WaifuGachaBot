import * as dotenv from 'dotenv';

dotenv.config();

const AppConfig = {
  token: process.env.BOT_TOKEN,
  commandPrefix: process.env.BOT_PREFIX,
  version: process.env.BOT_VERSION,
  currency: process.env.CURRENCY_NAME,
  currencyPlural: process.env.CURRENCY_PLURAL_NAME,
};

export default AppConfig;
