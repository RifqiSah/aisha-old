var Discord = require('discord.js');
var fs = require('fs');

/*
let rules = require('./util/rules.js');
let rulesLists = new Discord.Collection();

rules.rules.forEach(e => {
    rulesLists.set(e.no, e);
});

let user = "uwuchan";

let msg = 'tetew';
msg = msg.split("").map(ele => { return ele; });

let channel = "12345";

rulesLists.forEach(rule => {
    let count_each_rules = 0;
    let count = 0;
    
    // --
    let a = rule.allowed_area.length ? rule.allowed_area.filter(s => s.includes(channel)).length : false;
    let b = rule.disallowed_area.length ? rule.disallowed_area.filter(s => s.includes(channel)).length : false;
    // let c = rule.rules.length ? true : false;
    let d = rule.ban_words.length ? rule.ban_words.some(e => msg.includes(e)) : false;
    let e = rule.ban_users.length ? rule.ban_users.filter(s => s.includes(user)).length : false;
    // --

    if (a) count_each_rules++;
    if (b) count_each_rules++;
    if (d) count_each_rules++;
    if (e) count_each_rules++;

    console.log(`#${rule.no} count is ${count_each_rules}: [${a}] [${b}] [${d}] [${e}]`);

    // if (count == count_each_rules)
    //     console.log(`Gotcha! Rules no #${rule.no}, ${rule.desc}`);
})
return;
*/
// == Awal inisialisasi ==
console.log("[-] Initialize varible");
Client = {
    config: require('./config'),
    bot: new Discord.Client({ partials: ['USER', 'GUILD_MEMBER', 'MESSAGE', 'CHANNEL', 'REACTION'] }),
    discord_embed: new Discord.RichEmbed()
}

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