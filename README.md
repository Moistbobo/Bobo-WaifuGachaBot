
# WaifuBot (0.0.1-beta)
Made in China version of Mudae bot's Waifu rolling. Currently being rewritten.
Bot does not come with any data. You will have to add characters yourself for testing.

## Notes
- This is not a complete waifubot app, additional features (such as claiming, duplicate checking, etc) will be added in the future.

## Requirements
- [NodeJS](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/#download-links)
- [MongoDB](https://www.mongodb.com/download-center/community)
- **Optional**: [Robo3t](https://robomongo.org/download) 

## Getting started
1. Clone the repo (develop branch)
2. npm i
3. Copy the `env.sample` as `.env` and fill out the `BOT_TOKEN` and `BOT_PREFIX` fields. By default, `BOT_PREFIX` is set to `.`
4. npm run build-and-run

## Adding and rolling
1. Use the `.showtemplate` and copy the template arguments
2. Fill out your character's information
3. Add your character by using the `.addwaifu` command with your filled-out arguments
4. Use the `.rollwaifu` command to roll for the characters you added

 
