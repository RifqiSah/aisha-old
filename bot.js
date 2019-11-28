var Discord = require('discord.js');
var fs = require('fs');

// == Awal inisialisasi ==
Client = {
    config: require('./config'),
    bot: new Discord.Client(),
    discord_embed: new Discord.RichEmbed()
}
// == Akhir inisialisasi ==

// == Awal event handler ==
console.log("[] Initialize handler");
require('./util/eventHandler')(Client.bot, Client.config);
console.log("[] Done!");
// == Akhir event handler ==

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

console.log("[] Initialize command");
let commandsList = fs.readdirSync('./commands/');

Client.commands             = new Discord.Collection();
Client.commandsAlias        = new Discord.Collection();
Client.commandsRegex        = new Discord.Collection();

for (i = 0; i < commandsList.length; i++) {
    let item = commandsList[i];

    if (item.match(/\.js$/)) {
        let cmdfile = require(`./commands/${item}`);
        let key = item.slice(0, -3);

        console.log(`+ '${key}' added.`);

        Client.commands.set(key, cmdfile);
        cmdfile.aliases.forEach(alias => {
            Client.commandsAlias.set(alias, key)
        });

        if (cmdfile.regex) {
            Client.commandsRegex.set(key, `\\${cmdfile.name}\\`);
            cmdfile.aliases.forEach(alias => {
                Client.commandsRegex.set(alias, `\\${key}\\`);
            });
        }
    }
}

var regexList = new RegExp(Client.commandsRegex.map((key, item) => {return item}).join("|"));
// console.log(regexList);

console.log("[] Done!");
console.log("[] Bot is ready to start ...");

Client.bot.on('message', async (message) => {
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

    let regex   = null;
    let args    = null;
    let command = null;

    // == Awal regex checker ==
    // Cek apakah diawali prefix
    if (message.content.indexOf(Client.config.PREFIX) !== 0) {
        // Apakah ada di regex?
        if (regex = message.content.match(regexList)) command = regex[0]; // Isi command dengan hasil regexnya
        else return; // Jika tidak selesaikan
    }
    // Jika ya
    else {
        args = message.content.slice(Client.config.PREFIX.length).trim().split(/ +/g); // Mensplit string dengan " " agar didapatkan argumen
        command = args.shift().toLowerCase(); // Mengambil command
    }
    // == Akhir regex checker ==
    
    // == Awal command manager ==
    let commandfile = Client.commands.get(command) || Client.commands.get(Client.commandsAlias.get(command)); // Cari file command yang ditunjuk
    if (commandfile) {
        console.log(`-> Command '${commandfile.name}' executed! (Regex: ${(regex ? "YES" : "NO")})`);
        
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
                    message.channel.send(`Anda tidak mempunyai ijin untuk menggunakan command **${commandfile.name}**!`).then(msg => {msg.delete(5000)}).catch();
                }
            // Jika role tidak ada jalankan saja
            } else {
                commandfile.func(Client, message, args);
            }
        }
        // Command tidak aktif
        else {
            message.delete().catch(O_o=>{});
            message.channel.send(`Command **${commandfile.name}** sedang tidak aktif!`).then(msg => {msg.delete(5000)}).catch();
        }
    }
    // == Akhir command manager ==
});

// Bot LOGIN
if (Client.config.ENABLE)
    Client.bot.login(Client.config.TOKEN);