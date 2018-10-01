var Discord = require('discord.js');
var net = require('net');
var request = require("request");

var prefix = ".";
var version = "v3.7";
const activities_list = [
    "NULL",
    ".help for command.", 
    version + " is running.",
    "Milik Informate."
    ];

var bot = new Discord.Client();
bot.on("ready", function() {
    console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
        bot.user.setActivity(activities_list[index]);
    }, 10000);
});

bot.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'general');
    if (!channel)
        return;

    channel.send(`Selamat datang di Informate Server, ${member}!\nTaati peraturan yang telah dibuat pada ` + member.guild.channels.find(channel => channel.name === "peraturan").toString() + " demi kenyamanan kita bersama. Terima kasih ^^");
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
                Ancient[mAncient].user.send("Anda mendapatkan pesan penting dari " + message.author.username + ":", {
                    embed: {
                        color: 3447003,
                        description: args.join(" "),
                        footer: {
                            icon_url: message.author.avatarURL,
                            text: message.author.tag
                        }
                    }
                });
            }

            // For Hero Role
            for(var mHero in mHero) {
                Hero[mHero].user.send("Anda mendapatkan pesan penting dari " + message.author.username + ":", {
                    embed: {
                        color: 3447003,
                        description: args.join(" "),
                        footer: {
                            icon_url: message.author.avatarURL,
                            text: message.author.tag
                        }
                    }
                });
            }

            message.reply("Sukses mengirim pesan kepada para Ancient dan Hero.");
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
