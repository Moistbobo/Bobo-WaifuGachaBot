import Bot from './src/Bot';
import AppConfig from './src/AppConfig';

console.log('Bobo-waifubot starting up...');
// Timeout so bot does not spam discord login API due to nodemon updates
setTimeout(() => {
  Bot.runBot(AppConfig.token);
}, 1500);
