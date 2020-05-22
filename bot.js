/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const { Client, Collection, RichEmbed } = require('discord.js');
const apiai = require('apiai');
const db = require('./util/database');
const conf = require('./config');

// public init
console.log('[-] Initialize varible');
const client = {
    // General
    config: conf,
    bot: new Client({ partials: ['USER', 'GUILD_MEMBER', 'MESSAGE', 'CHANNEL', 'REACTION'] }),
    discord_embed: new RichEmbed(),
    apiAI: apiai(conf.TOKEN_APIAI),

    // Services
    chsvc: require('./services/channel.services'),
};

// Connect ke database
db.connect();
client.cmdcd = new Set();

// init commands collection
['cmds', 'cmdsalias', 'cmdsregex'].forEach((x) => { client[x] = new Collection(); });
console.info('[V] Done!');

// cek status bot
console.log('[-] Checking Bot status');
if (!client.config.ENABLE) {
    console.error('[X] Bot is disabled!');
    process.exit(1);
} else {
    client.bot.login(client.config.TOKEN); // Loginkan!
}

console.info('[V] Bot active!');

// init event handler
console.log('[-] Initialize handler');
['commands', 'events'].forEach((x) => {
    console.log(` [O] ${x} handler`);
    require(`./handlers/${x}`)(client);
});

console.log('[V] Done!');
console.log('[V] Aisha is ready to start!');
