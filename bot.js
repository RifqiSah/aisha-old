var Discord = require('discord.js');
var request = require("request");

var prefix = ".";

var bot = new Discord.Client();
bot.on("ready", function() {
    console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);
    bot.user.setActivity("Ver. 1.0.5");
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

    client.connect(server[i].port, server[i].ip, function() {
        console.log('Connected to ' + server[i].name + " server!");
    });

    client.on('data', function(data) {
        // console.log('Received: ' + data);

        msg.channel.send(server[i].name + " server is UP!");
        client.destroy(); // Kill client after server's response
    });

    client.on('error', function(err) {
        console.log(err);

        msg.channel.send(server[i].name + " server is DOWN!");
    })

    client.on('close', function() {
        console.log('Closed!');
    });

    // request({
    //     url: "https://dev.alriftech.com/cron/dnserver_load.php",
    //     json: true
    // }, function(error, response, body) {
    //     if (!error && response.statusCode === 200) {
    //         // var n = body.length;
    //         // for (var i = 0; i < n; i++) {
    //         //     console.log(body[i].id);
    //         //     console.log(body[i].shortName);
    //         //     console.log(body[i].server);
    //         // }

    //         msg.channel.send({
    //             embed: {
    //                 color: 16312092,
    //                 title: "Dragon Nest Server Information",
    //                 fields: [{
    //                         "name": "__**Name**__",
    //                         "value": "Indonesia\nSoutheast Asia",
    //                         "inline": true
    //                     },
    //                     {
    //                         "name": "__**Server**__",
    //                         "value": parseServer(body[8].server) + "\n" + parseServer(body[4].server),
    //                         "inline": true
    //                     }
    //                 ]
    //             }
    //         });
    //     }
    // });
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