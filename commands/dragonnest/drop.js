const func = require(',./../../util/funct');

const list = func.formatData('dndrop');

module.exports = {
    name: 'drop',
    desc: `Melihat info drop rate dari sebuah item pada Dragon Nest. Item yang tersedia yaitu:\n\n\`\`\`${list}\`\`\``,
    enable: true,
    regex: false,
    help: true,
    role: [],
    aliases: [],
    usage: '[jenis item]',
    cooldown: 0,
    func: (client, message, args) => {
        const item = (args.length ? args.join(' ').toLowerCase() : 'null');
        let msg = [];

        const items = item.replace(/\b\w/g, (l) => l.toUpperCase()).replace(/\b[a-zA-Z]{2,3}\b/g, (i) => i.toUpperCase());
        msg.push(`__**Drop Rate Untuk Item ${items}**__\n`);

        const data = func.getDNDropData(item);
        if (!data) msg.push(`Drop rate untuk item \`${items}\` tidak ditemukan!`);
        else msg = msg.concat(data);

        msg.push(`\nGunakan \`${client.config.PREFIX}help drop\` untuk melihat daftar item yang tersedia.`);
        message.channel.send(msg, { split: true });
    },
};
