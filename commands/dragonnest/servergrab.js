const superagent = require('superagent');

module.exports = {
    name: 'servergrab',
    desc: 'Mengubah status server Dragon Nest.',
    enable: true,
    regex: false,
    help: false,
    role: ['433870492378595329'],
    aliases: ['sg'],
    usage: '[server ID]',
    cooldown: 0,
    func: async (client, message, args) => {
        message.delete();
        const msgs = await message.channel.send(`Menunggu \`${args}\` ...`);

        await superagent.get(`https://alriftech.com/api/v2/bot/aisha/server_update/${args}`)
            .then((res) => {
                msgs.edit(`Sukses \`${args}\`! Respon:\`\`\`${res.text}\`\`\``).then((msg) => { msg.delete({ timeout: 50000 }); });
            })
            .catch((err) => {
                msgs.edit(`Uh oh, error tidak terduga:\`\`\`${err.status}: ${err.message}\`\`\``).then((msg) => { msg.delete({ timeout: 10000 }); });
            });
    },
};
