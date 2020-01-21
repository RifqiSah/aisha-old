const superagent = require("superagent");

module.exports = {
    name: "look",
    desc: "Melihat HTML dari sebuah URL.",
    enable: true,
    regex: false,
    help: true,
    role: ['433870492378595329'],
    aliases: ['see'],
	usage: '[link]',
	cooldown: 0,
    func: async (client, message, args) => {
        message.delete();
        let msg = await message.channel.send(`Menunggu *respon* \`${args}\` ...`);

        await superagent.get(`https://sea.dragonnest.com/news/notice/all/${args}`)
        .then(res => {
            msg.edit(`Respon:\`\`\`${res.text}\`\`\``).then(msg => {msg.delete(60000)});
        })
        .catch(err => {
            msg.edit(`Uh oh, error tidak terduga:\`\`\`${err.status}: ${err.message}\`\`\``).then(msg => {msg.delete(10000)});
            return;
        });
    }
}