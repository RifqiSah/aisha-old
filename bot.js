var Discord = require('discord.js');
var net = require('net');
var request = require("request");

// Database
var admin = require("firebase-admin");
var serviceAccount = require("./aisha-firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://aisha-4518d.firebaseio.com"
});

var db = admin.database();

var prefix = ".";
var version = "v4.4";
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
    let channel = member.guild.channels.find(ch => ch.name === 'out-off-topic');
    if (!channel)
        return;

    member.user.send("Terima kasih telah bergabung kedalam Discord milik Informate Squad 😃\nSilahkan membaca channel ``#peraturan`` terlebih dahulu sebelum memulai aktifitas didalam server Discord milik Informate Squad.\n\nTerima kasih 😃");
    channel.send(`Selamat datang di Informate Server, ${member}! Taati peraturan yang telah dibuat pada ` + member.guild.channels.find(channel => channel.name === "peraturan").toString() + " demi kenyamanan kita bersama.\n\nTerima kasih 😃");

    // For log
    member.guild.channels.find(ch => ch.name === 'member-log').send({
        embed: {
            color: 8311585,
            timestamp: new Date(),
            footer: {
                text: "User Joined"
            },
            author: {
                name: member.user.tag + " (" + member.user.id + ")",
                icon_url: member.user.avatarURL
            }
        }
    });
});

bot.on('guildMemberRemove', member => {
    member.guild.channels.find(ch => ch.name === 'member-log').send({
        embed: {
            color: 8311585,
            timestamp: new Date(),
            footer: {
                text: "User Left"
            },
            author: {
                name: member.user.tag + " (" + member.user.id + ")",
                icon_url: member.user.avatarURL
            }
        }
    });
});

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;
    
    const user = message.mentions.users.first();
    if (user) {
        if (user.presence.status === "offline")
            message.channel.send("**" + user.tag + "** sedang offline.").then(msg => {msg.delete(5000)}).catch();
        else if (user.presence.status === "idle")
            message.channel.send("**" + user.tag + "** sedang away.").then(msg => {msg.delete(5000)}).catch();
        else if (user.presence.status === "dnd")
            message.channel.send("**" + user.tag + "** sedang tidak dapat diganggu!").then(msg => {msg.delete(5000)}).catch();
    }
    
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

        case "say":
            if (message.member.roles.find("name", "Developer")) {
                const channel = message.mentions.channels.first();
                if (!channel) {
                    message.channel.send("Mohon masukkan channel!");
                    break;
                }

                args.shift(); // Hapus channel nya
                let sayMessage = args.join(" ");
                
                message.delete().catch(O_o=>{});
                channel.send(sayMessage);
            } else {
                message.delete().catch(O_o=>{});
                message.channel.send("Maaf, Anda tidak mempunya akses untuk menggunakan command ini!").then(msg => {msg.delete(5000)}).catch();
            }
            break;

        case "afk":
            simpanUser(message.author.username, true, args.join(" "));
            break;

        case "nafk":
            simpanUser(message.author.username, false, "Kosong");
            break;
            
	case "help":
            message.channel.send({
                embed: {
                    color: 3447003,
                    title: "Aisha BOT command",
                    description: "Command yang tersedia pada Aisha BOT. Gunakan prefix \"" + prefix + "\" di awal command agar dapat bekerja.",
                    fields: [{
                            name: "ping",
                            value: "Mendapatkan latency kepada API server Discord."
                        },
                        {
                            name: "alert [pesan]",
                            value: "Mengirim pesan \"Penting\" kepada para Ancient dan Hero.\nCommand ini digunakan jika ada pesan \"penting\" yang ingin segera disampaikan!"
                        },
                        {
                            name: "speak [pesan]",
                            value: "Mengajak BOT untuk berbicara."
                        }
                    ]
                }
            });
            break;

        default:
            break;
    }
});

function cekUser(username, message) {
    let ref = db.ref("user-status/" + username).once("value", function (data) {
        let afk = false;
        let pesan = null;

        afk = data.child("afk").val();
        pesan = data.child("pesan").val();

        if (afk)
            message.channel.send("**" + username + "** sedang AFK. " + pesan);
    });
}

function simpanUser(username, afk, pesan) {
    let ref = db.ref("user-status");

    ref.child(username).set({
        afk: afk,
        pesan: pesan
    });
}

bot.login(process.env.TOKEN);
