/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const Discord = require('discord.js');
const Dialogflow = require('apiai');
const fs = require('fs');
const db = require('./util/database.js');

// == Awal inisialisasi ==
console.log('[-] Initialize varible');
const Client = {
    // General
    config: require('./config'),
    bot: new Discord.Client({ partials: ['USER', 'GUILD_MEMBER', 'MESSAGE', 'CHANNEL', 'REACTION'] }),
    discord_embed: new Discord.RichEmbed(),
    apiAI: Dialogflow(require('./config').TOKEN_APIAI),

    // Services
    chsvc: require('./services/channel.services'),
};

db.connect();
Client.cmdcd = new Set();
console.log('[V] Done!');
// == Akhir inisialisasi ==

// == Awal cek status BOT ==
console.log('[-] Checking Bot status');
if (!Client.config.ENABLE) {
    console.log('[X] Bot is disabled!');
    process.exit(1);
} else {
    Client.bot.login(Client.config.TOKEN); // Bot LOGIN
}

console.log('[V] Bot active!');
// == akhir cek status BOT ==

// Awal init command ==
console.log('[-] Initialize command');
const commandsList = fs.readdirSync('./commands/');

Client.commands = new Discord.Collection();
Client.commandsAlias = new Discord.Collection();
Client.commandsRegex = new Discord.Collection();

// eslint-disable-next-line no-plusplus
for (let i = 0; i < commandsList.length; i++) {
    const item = commandsList[i];

    if (item.match(/\.js$/)) {
        const cmdfile = require(`./commands/${item}`);
        const key = item.slice(0, -3);

        console.log(`+ '${key}' added.`);

        Client.commands.set(key, cmdfile);
        cmdfile.aliases.forEach((alias) => {
            Client.commandsAlias.set(alias, key);
        });

        if (cmdfile.regex) {
            Client.commandsRegex.set(key, `\\${cmdfile.name}\\`);
            cmdfile.aliases.forEach((alias) => {
                Client.commandsRegex.set(alias, `\\${key}\\`);
            });
        }
    }
}

Client.regexList = new RegExp(Client.commandsRegex.map((key, item) => item).join('|'));
// console.log(regexList);
console.log('[V] Done!');
// == Akhir init command ==

// == Awal event handler ==
console.log('[-] Initialize handler');
require('./util/eventHandler')(Client, Client.bot, Client.config);

console.log('[V] Done!');
// == Akhir event handler ==

console.log('[V] Bot is ready to start!');
