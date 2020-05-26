const func = require(',./../../util/funct');

const list = func.formatData('dninfo');

module.exports = {
    name: 'info',
    desc: `Melihat info hal-hal yang ada pada Dragon Nest. Info yang tersedia yaitu:\n\n\`\`\`${list}\`\`\``,
    enable: true,
    regex: false,
    help: true,
    role: [],
    aliases: [],
    usage: '[jenis info]',
    cooldown: 0,
    func: (client, message, args) => {
        const info = (args.length ? args.join(' ').toLowerCase() : 'null');
        let msg = [];

        const infos = info.replace(/\b\w/g, (l) => l.toUpperCase()).replace(/\b[a-zA-Z]{2,3}\b/g, (i) => i.toUpperCase());
        msg.push(`__**Info Untuk ${infos}**__\n`);

        const data = func.getDNHpData(info);
        if (!data) msg.push(`Info untuk \`${infos}\` tidak ditemukan!`);
        else msg = msg.concat(data);

        msg.push(`\nGunakan \`${client.config.PREFIX}help info\` untuk melihat info yang tersedia.`);
        message.channel.send(msg, { split: true });
    },
};
