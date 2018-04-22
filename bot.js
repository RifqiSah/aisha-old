var Discord = require('discord.js');
var request = require("request");

var prefix = ".";

var bot = new Discord.Client();
bot.on("ready", function() {
    console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);
    bot.user.setActivity("Informate servers!");
});

function parseServer(a) {
    return (a == 1 ? "Online" : "Maintenance")
}

function checkServer(msg) {
    request({
        url: "https://dev.alriftech.com/cron/dnserver_load.php",
        json: true
    }, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            // var n = body.length;
            // for (var i = 0; i < n; i++) {
            //     console.log(body[i].id);
            //     console.log(body[i].shortName);
            //     console.log(body[i].server);
            // }

            msg.channel.send({
                embed: {
                    color: 3447003,
                    title: "Dragon Nest",
                    description: "**" + key + "** telah update dari " + old_ver + " ke " + new_ver,
                    timestamp: new Date(),
                    "fields": [{
                            "name": "__**Name**__",
                            "value": "Indonesia\nSoutheast Asia",
                            "inline": true
                        },
                        {
                            "name": "__**Server**__",
                            "value": parseServer(body[8].server) + "\n" + parseServer(body[4].server),
                            "inline": true
                        }
                    ]
                }
            });
        }
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
            checkServer(message);
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