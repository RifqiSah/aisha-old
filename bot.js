var Discord = require('discord.js');
var fs = require('fs');
const { VERSION, TOKEN, PREFIX } = require('./config');

const activities_list = [
    "NULL",
    PREFIX + "help for command.",
    VERSION + " is running.",
    "BOT Milik Informate."
];

var bot = new Discord.Client();
bot.on("ready", function() {
    // bot.user.setUsername("Aisha");
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

console.log("Looking for available command");
let commandsList = fs.readdirSync('./modules/');
let commands = {};
for (i = 0; i < commandsList.length; i++) {
    let item = commandsList[i];
    console.log(`Add '${item}' to command list ..`);

    if (item.match(/\.js$/)) {
        // delete require.cache[require.resolve(`./modules/${item}.js`)];
        commands[item.slice(0, -3)] = require(`./modules/${item}`);
    }
}

console.log("Success!");
console.log("Bot is standby ~");

bot.on('message', (message) => {
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

    if (message.content.indexOf(PREFIX) !== 0) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command in commands) {
        console.log(`Command '${command}' executed!`);

        if (commands[command].enabled)
            commands[command].func(commands, message, args);
        else
            message.channel.send("Command tidak aktif atau Anda tidak mempunyai ijin!").then(msg => {msg.delete(5000)}).catch();
    }
});

bot.login(TOKEN);