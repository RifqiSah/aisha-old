module.exports = {
    name: "test",
    desc: "Menguji coba fitur baru pada Aisha.",
    enable: true,
    regex: false,
    help: false,
    role: ['433870492378595329'],
    aliases: [],
	usage: '',
	cooldown: 0,
    func: (client, message, args) => {
        // message.channel.send('Dalam perbaikan! Tidak ada fitur baru!');

        await superagent.get(`http://dev.alriftech.com/core/dragonnest_rob_json`)
        .then(res => {
            msg.edit(`Sukses *grabbing* \`${args}\`! Respon:\`\`\`${res.text}\`\`\``).then(msg => {msg.delete(5000)});
        })
        .catch(err => {
            msg.edit(`Uh oh, error tidak terduga:\`\`\`${err.status}: ${err.message}\`\`\``).then(msg => {msg.delete(10000)});
            return;
        });
    }
}