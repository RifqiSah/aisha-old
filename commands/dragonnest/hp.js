const func = require(',./../../util/funct');

const list = func.formatData('dnhp');

module.exports = {
    name: 'hp',
    desc: `Informasi mengenai jumlah HP dari nest. HP yang tersedia yaitu:\n\n\`\`\`${list}\`\`\``,
    enable: true,
    regex: false,
    help: true,
    role: [],
    aliases: [],
    usage: '[jenis nest]',
    cooldown: 0,
    func: (client, message, args) => {
        const nest = (args.length ? args.join(' ').toLowerCase() : 'null');
        let msg = [];

        let nests = ''; // nest.replace(/\b\w/g, l => l.toUpperCase()).replace(/\b[a-zA-Z]{2,3}\b/g, i => i.toUpperCase());
        if (nest === 'gdn' || nest === 'green') nests = 'Green Dragon Nest';
        else if (nest === 'fdn' || nest === 'forest') nests = 'Forest Dragon Nest';
        else if (nest === 'bdn' || nest === 'black') nests = 'Black Dragon Nest';
        else if (nest === 'gudn' || nest === 'gust') nests = 'Gust Dragon Nest';
        else if (nest === 'stg' || nest === 'sunset') nests = 'Sunset Traning Ground';
        else nests = nest;

        msg.push(`__**HP Untuk ${nests}**__\n`);

        const data = func.getDNHpData(nest);
        if (!data) msg.push(`HP untuk \`${nests}\` tidak ditemukan!`);
        else msg = msg.concat(data);

        msg.push(`\nGunakan \`${client.config.PREFIX}help hp\` untuk melihat info yang tersedia.`);
        message.channel.send(msg, { split: true });
    },
};
