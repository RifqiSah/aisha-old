const superagent = require("superagent");
const moment = require('moment');

module.exports = {
    name: "rob",
    desc: "Memberikan informasi untuk `Rock of Blessing` yang sedang ada pada server!",
    enable: true,
    regex: true,
    help: true,
    role: ['489292018628165633'],
    aliases: [],
	usage: '',
	cooldown: 0,
    func: (client, message, args) => {
        let data = [];
        let msg = await message.channel.send(`Megambil data ...`);

        await superagent.get(`http://dev.alriftech.com/core/dragonnest_rob_json`)
        .then(res => {
            let robdata = JSON.parse(res.text);
            let count = 0;

            data.push("**Info Pemilik RoB**\n");

            for (let robh in robdata) {
                let item = robdata[robh];
                
                if (item.name.toString().trim() !== "BOT")
                    data.push(`[${moment(item.date).format("DD-MMM-YYYY")}] [${item.time}] : \`${item.name}\` (${item.class})`);
                else
                    count++;
            }

            data.push(`\n**${count}\** buah RoB mungkin dimiliki oleh BOT atau masih belum ditemukan.`);
            data.push("Semua waktu diatas dalam **GMT+8**.");

            msg.edit(data);
        })
        .catch(err => {
            msg.edit(`Uh oh, error tidak terduga:\`\`\`${err.status}: ${err.message}\`\`\``).then(msg => {msg.delete(10000)});
            return;
        });
    }
}