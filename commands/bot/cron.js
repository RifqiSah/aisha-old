const superagent = require('superagent');

module.exports = {
    name: 'cron',
    desc: 'Menjalankan cron job milik Alriftech.',
    enable: true,
    regex: false,
    help: false,
    role: ['433870492378595329'],
    aliases: ['cr'],
    usage: '[nama]',
    cooldown: 0,
    func: async (client, message, args) => {
        message.delete();
        const msgs = await message.channel.send(`Menunggu *cron* \`${args}\` ...`);

        await superagent.get(`https://alriftech.com/cron/${args}`)
            .then((res) => {
                msgs.edit(`Sukses *cron* \`${args}\`! Respon:\`\`\`${res.text}\`\`\``).then((msg) => { msg.delete({ timeout: 5000 }); });
            })
            .catch((err) => {
                msgs.edit(`Uh oh, error tidak terduga:\`\`\`${err.status}: ${err.message}\`\`\``).then((msg) => { msg.delete({ timeout: 10000 }); });
            });
    },
};
