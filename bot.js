var Discord = require('discord.js');
var Dialogflow = require('apiai');
var fs = require('fs');
var db = require('./util/database.js');

// == Awal inisialisasi ==
console.log("[-] Initialize varible");
Client = {
    // General
    config: require('./config'),
    bot: new Discord.Client({ partials: ['USER', 'GUILD_MEMBER', 'MESSAGE', 'CHANNEL', 'REACTION'] }),
    discord_embed: new Discord.RichEmbed(),
    apiAI: Dialogflow(require('./config').TOKEN_APIAI),

    // Services
    chsvc: require('./services/channel.services'),
}

db.connect();
Client.cmdcd = new Set();
console.log("[V] Done!");
// == Akhir inisialisasi ==

// == Awal cek status BOT ==
console.log("[-] Checking Bot status");
if (!Client.config.ENABLE) {
    console.log("[X] Bot is disabled!");
    return;
}
// Bot LOGIN
else
    Client.bot.login(Client.config.TOKEN);

console.log("[V] Bot active!");
// == akhir cek status BOT ==

// Awal init command ==
console.log("[-] Initialize command");
let commandsList = fs.readdirSync('./commands/');

Client.commands             = new Discord.Collection();
Client.commandsAlias        = new Discord.Collection();
Client.commandsRegex        = new Discord.Collection();

for (i = 0; i < commandsList.length; i++) {
    let item = commandsList[i];

    if (item.match(/\.js$/)) {
        let cmdfile = require(`./commands/${item}`);
        let key = item.slice(0, -3);

        console.log(`+ '${key}' added.`);

        Client.commands.set(key, cmdfile);
        cmdfile.aliases.forEach(alias => {
            Client.commandsAlias.set(alias, key)
        });

        if (cmdfile.regex) {
            Client.commandsRegex.set(key, `\\${cmdfile.name}\\`);
            cmdfile.aliases.forEach(alias => {
                Client.commandsRegex.set(alias, `\\${key}\\`);
            });
        }
    }
}

Client.regexList = new RegExp(Client.commandsRegex.map((key, item) => {return item}).join("|"));
// console.log(regexList);
console.log("[V] Done!");
// == Akhir init command ==

// == Awal event handler ==
console.log("[-] Initialize handler");
require('./util/eventHandler')(Client, Client.bot, Client.config);
console.log("[V] Done!");
// == Akhir event handler ==

console.log("[V] Bot is ready to start!");