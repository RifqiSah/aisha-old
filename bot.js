var Discord = require('discord.js');
var fs = require('fs');

Client = {
    config: require('./config'),
    bot: new Discord.Client(),
    discord_embed: new Discord.RichEmbed()
}

const activities_list = [
    "NULL",
    Client.config.PREFIX + "help for command.",
    Client.config.VERSION + " is running.",
    "BOT Milik Informate."
];

Client.bot.on("ready", function() {
    // Client.bot.user.setUsername("Aisha");
    console.log(`Bot has started, with ${Client.bot.users.size} users, in ${Client.bot.channels.size} channels of ${Client.bot.guilds.size} guilds.`);
    if (!Client.config.MT) {
        setInterval(() => {
            const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
            Client.bot.user.setActivity(activities_list[index]);
        }, 10000);
    }
    else {
        Client.bot.user.setActivity("BOT is maintenance until " + Client.config.MT_TIME);
    }
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
Client.commandsRegex = [];

for (i = 0; i < commandsList.length; i++) {
    let item = commandsList[i];
    console.log(`Add '${item.slice(0, -3)}' to command list ..`);

    if (item.match(/\.js$/)) {
        // delete require.cache[require.resolve(`./modules/${item}.js`)];
        Client.commands[item.slice(0, -3)] = require(`./modules/${item}`);
        Client.commandsRegex.push(`\b${item.slice(0, -3)}\b`);
    }
}

Client.commandsRegex = new RegExp(Client.commandsRegex.join('|'));

console.log("Success!");
console.log("Bot is standby ~");

Client.bot.on('message', (message) => {
    if (Client.config.MT) return;
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

        if (Client.commands[command].enable) {
            if (Client.commands[command].role.length > 0) {
                if (message.member.roles.some(role => Client.commands[command].role.includes(role.id))) {
                    Client.commands[command].func(Client, message, args);
                }
                else {
                    message.delete().catch(O_o=>{});
                    message.channel.send(`Anda tidak mempunyai ijin untuk menggunakan command **${command}**!`).then(msg => {msg.delete(5000)}).catch();
                }
            } else {
                Client.commands[command].func(Client, message, args);
            }
        }
        else {
            message.delete().catch(O_o=>{});
            message.channel.send(`Command **${command}** sedang tidak aktif!`).then(msg => {msg.delete(5000)}).catch();
        }
    }
});

if (Client.config.ENABLE)
    Client.bot.login(Client.config.TOKEN);