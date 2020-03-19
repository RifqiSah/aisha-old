const superagent = require("superagent");
const moment = require('moment');

module.exports = {
    name: "noblesse",
    desc: "Memberikan informasi untuk `Noblesse Buff` oleh VVIP1!",
    enable: true,
    regex: false,
    help: false,
    role: ['489292018628165633'],
    aliases: ['nb'],
	usage: '',
	cooldown: 60,
    func: async (client, message, args) => {
        message.delete();

        let data = [];
        let channel = message.guild.channels.find(ch => ch.id === '678739777700233216'); // noblesse info
        if (!channel) return;

        let msg = await message.channel.send(`Megambil data ...`);

        await superagent.get(`http://www.alriftech.com/api/v2/bot/aisha/nb`)
        .then(res => {
            let nbdata = JSON.parse(res.text);

            if (Array.isArray(nbdata) && nbdata.length === 0)
                return msg.edit("Belum ada informasi untuk Noblesse Buff!").then(msg => {msg.delete(10000)});

            for (let nbh in nbdata) {
                let item = nbdata[nbh];
                
                data.push("<@&676221506346549251>\n");
                data.push(`Noblesse Buff akan disebarkan oleh \`${item.name}\` (VVIP1) bertempat di \`${item.map}\` pada tanggal **${moment(item.date).format("DD-MMM-YYYY")}**, pukul **${item.time}** [GMT+8]`);
                data.push(`<${item.image}>`);
                data.push("\nKetik `.iam noblesse info` pada `#bot-spam` untuk mendapatkan informasi.")
            }

            channel.send(data);
        })
        .catch(err => {
            msg.edit(`Uh oh, error tidak terduga:\`\`\`${err.status}: ${err.message}\`\`\``).then(msg => {msg.delete(10000)});
            return;
        });

        msg.edit(`Sukses!`).then(msg => {msg.delete(10000)});
    }
}