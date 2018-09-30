var Discord = require('discord.js');
var net = require('net');
var request = require("request");
var sleep = require('sleep');

var prefix = ".";
var version = "v3.4";

var bot = new Discord.Client();
bot.on("ready", function() {
    console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);
    bot.user.setActivity(version + " | " + prefix + "help for command");
});

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    switch (command) {
        case "test":
            message.channel.send("Dalam perbaikan!");
            break;

        case "ping":
            message.channel.send("Pong! Latency: " + parseInt(bot.ping) + "ms");
            break;

        case "alert":
            message.delete();

            var Ancient     = message.guild.roles.find('name', 'Ancient').members.array();
            var Hero        = message.guild.roles.find('name', 'Hero').members.array();

            // For Ancient Role
            for(var mAncient in Ancient) {
                Ancient[mAncient].user.send({
                    content: "Anda mendapatkan pesan penting dari " + message.author.username,
                    embed: {
                        color: 3447003,
                        description: args.join(" "),
                        footer: {
                            text: message.author.tag
                        }
                    }
                });
            }

            // For Hero Role
            // for(var mHero in Hero) {
            //     Hero[mHero].user.send(args[0]);
            // }

            message.channel.send("Sukses mengirim pesan kepada para Ancient dan Hero! Kami akan merespon pesan Anda dengan segera.");
            sleep.sleep(5);
            message.delete();
            break;

        case "version":
            message.channel.send("Bot version: " + version);
            break;

        case "help":
            message.channel.send({
                embed: {
                    color: 3447003,
                    title: "Aisha BOT command",
                    description: "Command yang tersedia pada Aisha BOT. Gunakan prefix \"" + prefix + "\" di awal command agar dapat bekerja.",
                    fields: [{
                            name: "alert [pesan]",
                            value: "Mengirim pesan \"Penting\" kepada para Ancient dan Hero. Perhatian, jangan melakukan spam dengan command ini. Jika ketahuan spam Anda akan kami mute dari server!"
                        },
                        {
                            name: "ping",
                            value: "Mendapatkan latency kepada API server Discord."
                        }
                    ]
                }
            });
            break;

        default:
            break;
    }
});

bot.login(process.env.TOKEN);
