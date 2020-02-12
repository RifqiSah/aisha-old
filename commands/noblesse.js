const superagent = require("superagent");
const moment = require('moment');

module.exports = {
    name: "noblesse",
    desc: "Memberikan informasi untuk `Noblesse Buff` oleh VVIP1!",
    enable: true,
    regex: true,
    help: false,
    role: ['489292018628165633'],
    aliases: ['nb'],
	usage: '',
	cooldown: 60,
    func: async (client, message, args) => {
        message.delete();

        let data = [];
        let channel = message.guild.channels.find(ch => ch.id === '580444014218838041'); // dragonnest
        if (!channel) return;

        let msg = await channel.send(`Megambil data ...`);

        await superagent.get(`http://dev.alriftech.com/core/dragonnest_nb_json`)
        .then(res => {
            let nbdata = JSON.parse(res.text);

            for (let nbh in nbdata) {
                let item = nbdata[nbh];
                
                // data.push("<@&489292018628165633>\n");
                data.push(`Noblesse Buff akan disebarkan oleh VVIP1 pada tanggal **${moment(item.date).format("DD-MMM-YYYY")}**, pukul **${item.time}** [GMT+8]`);
                data.push(`<${item.image}>`);
                // data.push("\nKetikkan `.iam noblesse info` pada `#bot-spam` untuk mendapatkan informasi.")
            }

            msg.edit(data);
        })
        .catch(err => {
            msg.edit(`Uh oh, error tidak terduga:\`\`\`${err.status}: ${err.message}\`\`\``).then(msg => {msg.delete(10000)});
            return;
        });
    }
}