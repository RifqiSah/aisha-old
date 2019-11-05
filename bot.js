﻿var Discord = require('discord.js');
// var fs = require('fs');
// const { VERSION, TOKEN, PREFIX } = require('./config');

Client = {
    config: require('./config'),
    bot: Discord.Client()
}

const activities_list = [
    "NULL",
    Client.config.PREFIX + "help for command.",
    Client.config.VERSION + " is running.",
    "BOT Milik Informate."
];

// var bot = new Discord.Client();
Client.bot.on("ready", function() {
    // Client.bot.user.setUsername("Aisha");
    console.log(`Bot has started, with ${Client.bot.users.size} users, in ${Client.bot.channels.size} channels of ${Client.bot.guilds.size} guilds.`);
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
        Client.bot.user.setActivity(activities_list[index]);
    }, 10000);
});

Client.bot.on('guildMemberAdd', member => {
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

Client.bot.on('guildMemberRemove', member => {
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
Client.commands = {};
for (i = 0; i < commandsList.length; i++) {
    let item = commandsList[i];
    console.log(`Add '${item}' to command list ..`);

    if (item.match(/\.js$/)) {
        // delete require.cache[require.resolve(`./modules/${item}.js`)];
        Client.commands[item.slice(0, -3)] = require(`./modules/${item}`);
    }
}

console.log("Success!");
console.log("Bot is standby ~");

Client.bot.on('message', (message) => {
    if (message.author.equals(Client.bot.user)) return;
    
    const user = message.mentions.users.first();
    if (user) {
        if (user.presence.status === "offline")
            message.channel.send("**" + user.tag + "** sedang offline.").then(msg => {msg.delete(5000)}).catch();
        else if (user.presence.status === "idle")
            message.channel.send("**" + user.tag + "** sedang away.").then(msg => {msg.delete(5000)}).catch();
        else if (user.presence.status === "dnd")
            message.channel.send("**" + user.tag + "** sedang tidak dapat diganggu!").then(msg => {msg.delete(5000)}).catch();
    }

    if (message.content.indexOf(Client.config.PREFIX) !== 0) return;

    const args = message.content.slice(Client.config.PREFIX.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command in Client.commands) {
        console.log(`Command '${command}' executed!`);

        if (Client.commands[command].enabled)
            Client.commands[command].func(Client, message, args);
        else
            message.channel.send("Command tidak aktif atau Anda tidak mempunyai ijin!").then(msg => {msg.delete(5000)}).catch();
    }
});

Client.bot.login(Client.config.TOKEN);