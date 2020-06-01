const funct = require('../../util/funct.js');

module.exports = {
    name: 'help',
    desc: 'Daftar command yang dapat digunakan pada Aisha.',
    enable: true,
    regex: false,
    help: true,
    role: [],
    aliases: ['h'],
    usage: '[nama command]',
    cooldown: 0,
    // eslint-disable-next-line consistent-return
    func: (client, message, args) => {
        const data = [];
        const dev = funct.isDeveloper(message.member);

        if (!args.length) {
            data.push('Hai! Ini adalah daftar command yang tersedia:\n');
            client.cmds.forEach((item) => {
                if (item.help || dev) data.push(`\`${item.name}\` : ${item.desc.split('.')[0]}.`);
            });

            data.push(`\nAnda dapat menggunakan \`${client.config.PREFIX}help [nama command]\` untuk mendapatkan informasi dari command tersebut.`);
        } else {
            const name = args[0].toLowerCase();

            // eslint-disable-next-line max-len
            const command = client.cmds.get(name) || client.cmds.get(client.cmdsalias.get(name));
            if (!command) return message.reply('Command tidak valid!');

            data.push(`Informasi mengenai command \`${command.name}\`:\n`);

            if (command.aliases) data.push(`\`Alias\` : ${command.aliases.length ? `${command.aliases.join(', ')}` : '-'}`);
            if (command.desc) data.push(`\`Deskripsi\` : ${command.desc}`);
            if (command.usage) data.push(`\`Penggunaan\` : ${client.config.PREFIX}${name} ${command.usage}.`);
            if (command.role) data.push(`\`Role\` : ${command.role.length ? command.role.map((i) => message.guild.roles.cache.get(`${i}`)).join(', ') : '-'}.`);

            data.push(`\`Regex\` : ${command.regex ? 'Ya' : 'Tidak'}.`);
            data.push(`\`Cooldown\` : ${command.cooldown} detik.`);
            data.push(`\nAnda dapat menggunakan \`${client.config.PREFIX}help\` untuk mendapatkan informasi dari semua command yang tersedia.`);
        }

        message.channel.send(data, { split: true });
    },
};
