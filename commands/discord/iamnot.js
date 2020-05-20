const funct = require('../../util/funct.js');

module.exports = {
    name: 'iamnot',
    desc: 'Melepas role yang terpasang pada Anda.',
    enable: true,
    regex: false,
    help: false,
    role: ['372929327903408150', '668439117264191498'],
    aliases: [],
    usage: '',
    cooldown: 0,
    // eslint-disable-next-line consistent-return
    func: (client, message, args) => {
        if (!args.length) return message.reply('Kamu tidak memasukan nama role!');

        let role = args.join(' ').toLowerCase();
        role = role.replace(/\b\w/g, (l) => l.toUpperCase());
        role = message.guild.roles.find((r) => r.name === role);

        if (funct.getAllowedRoles(role.id)) {
            if (message.member.roles.has(role.id)) {
                message.member.removeRole(role.id);
                message.reply(`Anda berhasil melepaskan role \`${role.name}\`!`);
            } else {
                message.reply(`Anda tidak memiliki role \`${role.name}\`!`);
            }
        } else {
            message.reply(`Maaf, role \`${role.name}\` tidak dapat digunakan!`);
        }
    },
};
