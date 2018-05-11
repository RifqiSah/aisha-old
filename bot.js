var Discord = require('discord.js');
var net = require('net');
var request = require("request");

var prefix = ".";

var bot = new Discord.Client();
bot.on("ready", function() {
    console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);
    bot.user.setActivity("Ver. 1.0.11");
});

var server = [
    { id: "ina", name: "Indonesia", ip: "49.50.4.219", port: 14300 },
    { id: "sea", name: "Southeast Asia", ip: "202.14.200.67", port: 14301 },
    { id: "na", name: "North America", ip: "211.43.155.163", port: 14300 },
    { id: "ko", name: "Korea", ip: "211.233.18.72", port: 14300 },
    { id: "eu", name: "Euro", ip: "211.43.158.240", port: 14300 },
    { id: "tw", name: "Taiwan", ip: "210.242.206.177", port: 14300 }
];

function parseServer(a) {
    return (a == 1 ? "Online" : "Maintenance")
}

function checkServer(msg, arg) {
    let client = new net.Socket();
    let i = -1;

    switch (arg) {
        case "ina":
            i = 0;
            break;

        case "sea":
            i = 1;
            break;

        case "na":
            i = 2;
            break;

        case "ko":
            i = 3;
            break;

        case "eu":
            i = 4;
            break;

        case "tw":
            i = 5;
            break;

        default:
            msg.channel.send("Server not found!");
            return;
            break;
    }

    // msg.channel.send("Selected server: **" + server[i].name + "**");
    // msg.channel.send("------------");

    client.connect(server[i].port, server[i].ip, function() {
        msg.channel.send('Connected!');
    });

    client.on('data', function(data) {
        msg.channel.send({
            embed: {
                color: 3447003,
                title: "Dragon Nest",
                description: "Server **" + server[i].name + "** sedang **Online**."
            }
        });
        client.destroy();
    });

    client.on('error', function(err) {
        console.log(err);
        msg.channel.send({
            embed: {
                color: 3447003,
                title: "Dragon Nest",
                description: "Server **" + server[i].name + "** sedang **Maintenance**."
            }
        });
    })

    client.on('close', function() {
        console.log('Closed!');
    });
}

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    switch (command) {
        case "ping":
            message.channel.send("Pong! Latency: " + parseInt(bot.ping) + "ms");
            break;

        case "server":
            checkServer(message, args[0]);
            break;

        case "help":
            message.channel.send({
                embed: {
                    color: 3447003,
                    title: "Aisha BOT command",
                    description: "Command yang tersedia pada Aisha BOT. Gunakan prefix \"" + prefix + "\" di awal command agar dapat bekerja.",
                    fields: [{
                            name: "server",
                            value: "Mendapatkan informasi server Dragon Nest."
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