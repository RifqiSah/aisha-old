module.exports = {
    name: "help",
    desc: "Daftar command yang dapat digunakan pada Aisha.",
    enable: true,
    regex: false,
    help: true,
    role: [],
    aliases: [],
	usage: '[Nama Command]',
	cooldown: 0,
    func: (client, message, args) => {
        const data = [];
        if (!args.length) {
            data.push('Hai! Ini adalah daftar command yang tersedia:\n');
            client.commands.forEach(item => {
                if (item.help) data.push(`\`${item.name}\` : ${item.desc}`);
            });

            data.push(`\nAnda dapat menggunakan \`${client.config.PREFIX}help [nama command]\` untuk mendapatkan informasi dari command tersebut.`);
        }
        else {
            let name = args[0].toLowerCase();
            data.push(`Informasi mengenai command \`${name}\`:\n`);

            const command = client.commands.get(name);
            if (!command) {
                return message.reply('Command tidak valid!');
            }

            if (command.aliases) data.push(`**Alias:** ` + (command.aliases.length ? `${command.aliases.join(", ")}` : `Tidak Ada`));
            if (command.desc) data.push(`**Deskripsi:** ${command.desc}`);
            if (command.usage) data.push(`**Penggunaan:** ${client.config.PREFIX}${name} ${command.usage}`);
            if (command.role) data.push(`**Role:** ` + (command.role.length ? command.role.map(i => `<@` + i + `>`).join(", ") : `Tidak Ada`));

            data.push(`**Cooldown:** ${command.cooldown} detik(s)`);
            data.push(`\nAnda dapat menggunakan \`${client.config.PREFIX}help\` untuk mendapatkan informasi dari semua command yang tersedia.`);
        }

        message.channel.send(data, { split: true });
    }
}