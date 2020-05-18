const superagent = require('superagent');

module.exports = {
    name: 'grab',
    desc: 'Mengambil data Announce dan Server Version.',
    enable: true,
    regex: false,
    help: false,
    role: ['433870492378595329'],
    aliases: ['get'],
    usage: '[tipe]',
    cooldown: 0,
    func: async (client, message, args) => {
        message.delete();
        const msgs = await message.channel.send(`Menunggu *grabbing* \`${args}\` ...`);

        await superagent.get(`http://dev.alriftech.com/cron/${args}.php`)
            .then((res) => {
                msgs.edit(`Sukses *grabbing* \`${args}\`! Respon:\`\`\`${res.text}\`\`\``).then((msg) => { msg.delete(5000); });
            })
            .catch((err) => {
                msgs.edit(`Uh oh, error tidak terduga:\`\`\`${err.status}: ${err.message}\`\`\``).then((msg) => { msg.delete(10000); });
            });
    },
};
