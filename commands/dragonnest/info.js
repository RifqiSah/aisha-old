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
        const msg = [];

        const data = func.getDNInfoData(info);
        if (!data) msg.push(`Info untuk \`${info}\` tidak ditemukan!`);
        else {
            msg.push(`__**Info untuk ${data.name}**__\n`);
            data.data.map((id) => {
                msg.push(id);
            });
        }

        msg.push(`\nGunakan \`${client.config.PREFIX}help info\` untuk melihat info yang tersedia.`);
        message.channel.send(msg, { split: true });
    },
};
