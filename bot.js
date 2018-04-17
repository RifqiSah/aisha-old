var Discord = require('discord.js');
var request = require("request");
var server = [
    { name: "INA", ip: "49.50.4.219", port: 14300 },
    { name: "SEA", ip: "202.14.200.67", port: 14301 }
    // { name: "NA", ip: "211.43.155.163", port: 14300 },
    // { name: "KO", ip: "211.233.18.72", port: 14300 },
    // { name: "JP", ip: "dn-login01.hangame.co.jp", port: 14300 },
    // { name: "EU", ip: "211.43.158.240", port: 14300 },
    // { name: "TW", ip: "210.242.206.177", port: 14300 },
    // { name: "TH", ip: "103.4.156.8", port: 14300 }
];

function sendMessage(message, s1, s2) {
    let embed = {
        "color": 16312092,
        "fields": [{
                "name": "__**Dragon Nest**__",
                "value": "Indonesia\nSoutheast Asia",
                "inline": true
            },
            {
                "name": "__**Status**__",
                "value": (s1 == 1 ? "Online" : "Maintenance!") + "\n" + (s2 == 1 ? "Online" : "Maintenance!"),
                "inline": true
            }
        ]
    };

    message.channel.send("Server status dari Dragon Nest\n ", { embed });
}

function checkServer(i) {
    let ret = -1;
    let client = new net.Socket();

    client.connect(server[i].port, server[i].ip, function() {
        // console.log('Connected to ' + server[i].name + " server!");
    });

    client.on('data', function(data) {
        // console.log('Received: ' + data);

        ret = 1;
        console.log(server[i].name + " server is UP!");
        client.destroy(); // Kill client after server's response
    });

    client.on('error', function(err) {
        // console.log(err);

        ret = 0;
        console.log(server[i].name + " server is DOWN!");
    })

    client.on('close', function() {
        // console.log('Closed!');
    });
    // }

    return ret;
}

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

    switch (command) {
        case "ping":
            message.channel.send("Pong! Latency: " + parseInt(bot.ping) + "ms");
            break;

        case "server":
            let s1 = checkServer(0);
            let s2 = checkServer(1);

            sendMessage(message, s1, s2);
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