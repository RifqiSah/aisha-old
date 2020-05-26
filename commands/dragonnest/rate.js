const func = require(',./../../util/funct');

const list = func.formatData('dnrate');

module.exports = {
    name: 'rate',
    desc: `Melihat info rate enhance, dan chance apapun (kecuali drop) pada Dragon Nest. Rate yang tersedia yaitu:\n\n\`\`\`${list}\`\`\``,
    enable: true,
    regex: false,
    help: true,
    role: [],
    aliases: [],
    usage: '[jenis rate]',
    cooldown: 0,
    func: (client, message, args) => {
        const rate = (args.length ? args.join(' ').toLowerCase() : 'null');
        let msg = [];

        const rates = rate.replace(/\b\w/g, (l) => l.toUpperCase()).replace(/\b[a-zA-Z]{2,3}\b/g, (i) => i.toUpperCase());
        msg.push(`__**Rate Untuk ${rates}**__\n`);

        const data = func.getDNRateData(rate);
        if (!data) msg.push(`Rate untuk \`${rates}\` tidak ditemukan!`);
        else msg = msg.concat(data);

        msg.push(`\nGunakan \`${client.config.PREFIX}help rate\` untuk melihat rate yang tersedia.`);
        message.channel.send(msg, { split: true });
    },
};
