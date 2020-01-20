var Discord = require('discord.js');
var fs = require('fs');

/*
let rules = require('./util/rules.js');
let rulesLists = new Discord.Collection();

rules.rules.forEach(e => {
    rulesLists.set(e.no, e);
});

let user = "uwuchan";

let msg = 'tetew';
msg = msg.split("").map(ele => { return ele; });

let channel = "12345";

rulesLists.forEach(rule => {
    let count_each_rules = 0;
    let count = 0;
    
    // --
    let a = rule.allowed_area.length ? rule.allowed_area.filter(s => s.includes(channel)).length : false;
    let b = rule.disallowed_area.length ? rule.disallowed_area.filter(s => s.includes(channel)).length : false;
    // let c = rule.rules.length ? true : false;
    let d = rule.ban_words.length ? rule.ban_words.some(e => msg.includes(e)) : false;
    let e = rule.ban_users.length ? rule.ban_users.filter(s => s.includes(user)).length : false;
    // --

    if (a) count_each_rules++;
    if (b) count_each_rules++;
    if (d) count_each_rules++;
    if (e) count_each_rules++;

    console.log(`#${rule.no} count is ${count_each_rules}: [${a}] [${b}] [${d}] [${e}]`);

    // if (count == count_each_rules)
    //     console.log(`Gotcha! Rules no #${rule.no}, ${rule.desc}`);
})
return;
*/
// == Awal inisialisasi ==
Client = {
    config: require('./config'),
    bot: new Discord.Client(),
    discord_embed: new Discord.RichEmbed()
}

var cmdcd = new Set();
// == Akhir inisialisasi ==

// == Awal cek status BOT ==
if (!Client.config.ENABLE) {
    console.log("[X] Bot is disabled!");
    return;
}
// Bot LOGIN
else
    Client.bot.login(Client.config.TOKEN);
// == akhir cek status BOT ==

// == Awal event handler ==
console.log("[] Initialize handler");
require('./util/eventHandler')(Client.bot, Client.config);
console.log("[] Done!");
// == Akhir event handler ==

// Awal init command ==
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
// == Akhir init command ==

console.log("[] Done!");
console.log("[] Bot is ready to start ...");

Client.bot.on('message', async (message) => {
    if (Client.config.MT) return; // Cek status bot apakah sedang maintenis atau tidak
    if (message.author.bot || message.channel.type === "dm") return; // Jangan hiraukan chat dari sesama bot dan pastikan chat berasal dari guild

    // == Awal pengecekan mention BOT ==
    if (message.isMemberMentioned(Client.bot.user)) {
        message.channel.send("Ya?");
        return;
    }
    // == Akhir pengecekan mention BOT ==

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
        // Cek apakah command ada cooldownnya
        if (commandfile.cooldown > 0) {
            // Cek dulu apakah user sudah menjalankan command sebelumnya?
            if (cmdcd.has(message.author.id))
                return message.reply(`Anda harus menunggu selama \`${commandfile.cooldown} detik\` sebelum menggunakan command \`${commandfile.name}\` kembali!`).then(msg => {msg.delete(10000)}).catch();
            
            // Kalau tidak
            cmdcd.add(message.author.id); // Tambahkan user kedalam list cooldown
            
            // Hapus user setelah timeout habis
            setTimeout(() => {
                cmdcd.delete(message.author.id);
            }, commandfile.cooldown * 1000);
        }

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
                    message.channel.send(`Anda tidak mempunyai ijin untuk menggunakan command \`${commandfile.name}\`!`).then(msg => {msg.delete(5000)}).catch();
                }
            // Jika role tidak ada jalankan saja
            } else {
                commandfile.func(Client, message, args);
            }
        }
        // Command tidak aktif
        else {
            message.delete().catch(O_o=>{});
            message.channel.send(`Command \`${commandfile.name}\` sedang tidak aktif!`).then(msg => {msg.delete(5000)}).catch();
        }
    }
    // == Akhir command manager ==
});

Client.bot.on('messageReactionAdd', async (reaction, user) => {
    // Ketika menerima reaction, cek jika pesan sebagian atau tidak
	if (reaction.message.partial) {
		// Jika pesan sudah dihapus, akan terjadi API error, harus dihandle
		try {
			await reaction.message.fetch();
		} catch (error) {
			console.log('Terjadi error saat fetch pesan: ', error);
		}
	}

    // Cek juka jika reaction sebagian atau tidak
	if (reaction.partial) {
		try {
            await reaction.fetch();
		} catch (error) {
			console.log('Terjadi error saat fetch reaction: ', error);
		}
    }
    
    // Filter emojinya
    let message = reaction.message;
    let emoji = reaction.emoji;

    if (emoji == '🇲') {
        message.guild.fetchMember(user.id).then(member => {
            member.addRole('668660316036530216');
        });
    }

    if (emoji == '🇹') {
        message.guild.fetchMember(user.id).then(member => {
            member.addRole('668680264096022550');
        });
    }
});

Client.bot.on('messageReactionRemove', async (reaction, user) => {
    // Ketika menerima reaction, cek jika pesan sebagian atau tidak
	if (reaction.message.partial) {
		// Jika pesan sudah dihapus, akan terjadi API error, harus dihandle
		try {
			await reaction.message.fetch();
		} catch (error) {
			console.log('Terjadi error saat fetch pesan: ', error);
		}
	}

    // Cek juka jika reaction sebagian atau tidak
	if (reaction.partial) {
		try {
            await reaction.fetch();
		} catch (error) {
			console.log('Terjadi error saat fetch reaction: ', error);
		}
    }
    
    // Filter emojinya
    let message = reaction.message;
    let emoji = reaction.emoji;

    if (emoji == '🇲') {
        message.guild.fetchMember(user.id).then(member => {
            member.removeRole('668660316036530216');
        });
    }

    if (emoji == '🇹') {
        message.guild.fetchMember(user.id).then(member => {
            member.removeRole('668680264096022550');
        });
    }
});