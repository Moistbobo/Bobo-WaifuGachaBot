import * as dotenv from 'dotenv';

dotenv.config();

const AppConfig = {
  token: process.env.BOT_TOKEN,
  commandPrefix: process.env.BOT_PREFIX,
};

export default AppConfig;
