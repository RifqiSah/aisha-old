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
    "Informate's BOT."
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
let commandsList = fs.readdirSync('./commands/');

Client.commands             = new Discord.Collection();
Client.commandsAlias        = new Discord.Collection();
Client.commandsRegex        = new Discord.Collection();
Client.commandsRegexAlias   = new Discord.Collection();

for (i = 0; i < commandsList.length; i++) {
    let item = commandsList[i];

    if (item.match(/\.js$/)) {
        let cmdfile = require(`./commands/${item}`);
        let key = item.slice(0, -3);

        console.log(`+ '${key}' added to command list.`);

        Client.commands.set(key, cmdfile);
        cmdfile.aliases.forEach(alias => {
            Client.commandsAlias.set(alias, key)
        });

        // if (cmdfile.regex) {
        //     Client.commandsRegex.set(key, cmdfile);
        //     cmdfile.aliases.forEach(alias => {
        //         Client.commandsRegexAlias.set(alias, key)
        //     });
        // }
    }
}

console.log("Success!");
console.log("Bot is standby ~");

Client.bot.on('message', (message) => {
    if (Client.config.MT) return; // Cek status bot apakah sedang maintenis atau tidak
    if (message.author.bot || message.channel.type === "dm") return; // Jangan hiraukan chat dari sesama bot dan pastikan chat berasal dari guild

    // == Awal pengecekan user ==
    const users = message.mentions.users.map(user => {
        if (user.presence.status === "offline") return `**${user.tag}** sedang offline.`;
        else if (user.presence.status === "idle") return `**${user.tag}** sedang away.`;
        else if (user.presence.status === "dnd") return `**${user.tag}** sedang tidak dapat diganggu.`;
    });
    
    if (users.length > 0) message.channel.send(users).then(msg => {msg.delete(5000)}).catch();
    // == Akhir pengecekan user ==

    if (message.content.indexOf(Client.config.PREFIX) !== 0) return; // Pastikan diawali prefix

    // == Awal command manager ==
    let args = message.content.slice(Client.config.PREFIX.length).trim().split(/ +/g); // Mensplit string dengan " " agar didapatkan argumen
    let command = args.shift().toLowerCase(); // Mengambil command
    let commandfile = Client.commands.get(command) || Client.commands.get(Client.commandsAlias.get(command)); // Cari file command yang ditunjuk
    if (commandfile) {
        console.log(`Command '${command}' executed!`);
        
        // Cek apakah command sedang aktif atau tidak
        if (commandfile.enable) {
            // Apakah command mempunya role (role != null)
            if (commandfile.role.length > 0) {
                // Apakah role pengguna ada pada command ini?
                if (message.member.roles.some(role => commandfile.role.includes(role.id))) {
                    // Jalankan
                    commandfile.func(Client, message, args);
                }
                // Tidak ada? Tampilkan pesan error
                else {
                    message.delete().catch(O_o=>{});
                    message.channel.send(`Anda tidak mempunyai ijin untuk menggunakan command **${command}**!`).then(msg => {msg.delete(5000)}).catch();
                }
            // Jika role tidak ada jalankan saja
            } else {
                commandfile.func(Client, message, args);
            }
        }
        // Command tidak aktif
        else {
            message.delete().catch(O_o=>{});
            message.channel.send(`Command **${command}** sedang tidak aktif!`).then(msg => {msg.delete(5000)}).catch();
        }
    }
    // == Akhir command manager ==
});

// Bot LOGIN
if (Client.config.ENABLE)
    Client.bot.login(Client.config.TOKEN);