# NikkiBot
Bot that keeps track of notes and irritatingly reminds you of them.

Version: 1.0.0

## Setup
Run `npm install` to install all required node modules.

### Bot configuration
To use the bot, you will need to make a Discord bot application. Follow the instructions from here: https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot

The bot is configured with files under the /config directory. Sensitive data is not in version control, so you need to create some of these files on your own. Templates are provided in the /config folder.

**Token**
Copy the token.js.template and rename into `token.js`. This is the file where you should store your bot's token, client id and the id of your test server. You can get the first two from Discord Developer portal, where you make your application. The last one can be found from Discord, right clicking the server name (when Developer mode is enabled). The bot token is used for bot usage, the other two are needed for updating/registering slash commands.

**Mongodb**
Copy the mongodb_config.js.template and rename into `mongodb_config.js`. This is the file where you should store your database credentials and address.