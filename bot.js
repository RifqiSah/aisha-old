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

function checkServer() {
    for (let i = 0; i < server.length; i++) {
        let client = new net.Socket();

        client.connect(server[i].port, server[i].ip, function() {
            // console.log('Connected to ' + server[i].name + " server!");
        });

        client.on('data', function(data) {
            // console.log('Received: ' + data);

            console.log(server[i].name + " server is UP!");
            client.destroy(); // Kill client after server's response
        });

        client.on('error', function(err) {
            // console.log(err);
            console.log(server[i].name + " server is DOWN!");
        })

        client.on('close', function() {
            // console.log('Closed!');
        });
    }
}

var prefix = ".";

var bot = new Discord.Client();
bot.on("ready", function() {
    console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);
    bot.user.setActivity(`${bot.users.size } users [` + prefix + `help]`);
});

/*
const embed = {
  "color": 16312092,
  "timestamp": "2018-04-17T08:04:59.366Z",
  "fields": [
    {
      "name": "__**Dragon Nest**__",
      "value": "Indonesia\nSoutheast Asia",
      "inline": true
    },
    {
      "name": "__**Status**__",
      "value": "Online\nMaintenance!",
      "inline": true
    }
  ]
};
channel.send("Server status dari Dragon Nest\n ", { embed });
*/

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === "ping") {
        message.channel.send("Pong! Latency: " + parseInt(bot.ping) + "ms");
    } else if (command === "server") {
        sendMessage(message, 1, 1);
    } else if (command === "help") {
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
    }
});

bot.login(process.env.TOKEN);