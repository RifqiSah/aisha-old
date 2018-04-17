const Discord = require('discord.js');
const request = require("request");

var prefix = ".";

var bot = new Discord.Client();
bot.on("ready", function() {
    console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);
    bot.user.setActivity(`${bot.users.size } users [` + prefix + `help]`);
});

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === "ping") {
        message.channel.send("Pong! Latency: " + parseInt(bot.ping) + "ms");

    } else if (command === "help") {
        message.channel.send({
            embed: {
                color: 3447003,
                title: "Aisha BOT command",
                description: "Command yang tersedia pada Aisha BOT. Gunakan prefix \"" + prefix + "\" di awal command agar dapat bekerja.",
                fields: [{
                    name: "ping",
                    value: "Mendapatkan latency kepada API server Discord."
                }]
            }
        });
    }
});

bot.login(process.env.TOKEN);