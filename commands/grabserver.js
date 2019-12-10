const superagent = require("superagent");

module.exports = {
    name: "grabserver",
    desc: "Mengubah status server Dragon Nest.",
    enable: true,
    regex: false,
    help: false,
    role: ['433870492378595329'],
    aliases: ['server'],
	usage: '[server ID]',
	cooldown: 0,
    func: async (client, message, args) => {
        message.delete();
        let msg = await message.channel.send(`Menunggu \`${args}\` ...`);

        await superagent.get(`https://dev.alriftech.com/core/dragonnest_update/${args}`)
        .then(res => {
            msg.edit(`Sukses \`${args}\`! Respon:\`\`\`${res.text}\`\`\``).then(msg => {msg.delete(5000)});
        })
        .catch(err => {
            msg.edit(`Uh oh, error tidak terduga:\`\`\`${err.status}: ${err.message}\`\`\``).then(msg => {msg.delete(5000)});
            return;
        });
    }
}