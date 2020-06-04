/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-plusplus */
const superagent = require('superagent');
const moment = require('moment');

module.exports = {
    name: 'rob',
    desc: 'Memberikan informasi untuk `Rock of Blessing` yang sedang ada pada server!',
    enable: true,
    regex: false,
    help: true,
    role: ['489292018628165633'],
    aliases: [],
    usage: '',
    cooldown: 0,
    // eslint-disable-next-line no-unused-vars
    func: async (client, message, args) => {
        const data = [];
        const msgs = await message.channel.send('Megambil data ...');

        await superagent.get('https://alriftech.com/api/v2/bot/aisha/rob')
            .then((res) => {
                const robdata = JSON.parse(res.text);
                let count = 0;

                data.push('**Info Pemilik RoB**\n');

                for (const robh in robdata) {
                    const item = robdata[robh];

                    if (item.name.toString().trim() !== 'BOT') data.push(`[${moment(item.date).format('DD-MMM-YYYY')}] [${item.time}] : \`${item.name}\` (${item.class})`);
                    else count++;
                }

                data.push(`\n**${count}** buah RoB mungkin dimiliki oleh BOT atau masih belum ditemukan.`);
                data.push('Semua waktu diatas dalam **GMT+8**.');

                msgs.edit(data);
            })
            .catch((err) => {
                msgs.edit(`Uh oh, error tidak terduga:\`\`\`${err.status}: ${err.message}\`\`\``).then((msg) => { msg.delete({ timeout: 10000 }); });
            });
    },
};
