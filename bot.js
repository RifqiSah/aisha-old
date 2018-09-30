var Discord = require('discord.js');
var net = require('net');
var request = require("request");

var prefix = ".";
var version = "v3.1";

var bot = new Discord.Client();
bot.on("ready", function() {
    console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);
    bot.user.setActivity(version + " | " + prefix + "help");
});

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    switch (command) {
        case "test":
            const ListEmbed = new Discord.RichEmbed()
                .setTitle('Users with the go4 role:')
                .setDescription(message.guild.roles.get('372916656231415811').members.map(m=>m.user.tag).join('\n'));
                message.channel.send(ListEmbed);
            break;

        case "ping":
            message.channel.send("Pong! Latency: " + parseInt(bot.ping) + "ms");
            
            let smember = message.channel.members.find('id', '372912488066580490');
            smember.send('Test message');
            break;

        case "alert":
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
                            name: "version",
                            value: "Mendapatkan informasi versi BOT Aisha."
                        }, {
                            name: "alert [pesan]",
                            value: "Mengirim pesan kepada Ancient dan Hero."
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
