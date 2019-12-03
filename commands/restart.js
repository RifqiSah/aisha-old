module.exports = {
    name: "restart",
    desc: "Menjalankan ulang BOT dari server.",
    enable: true,
    regex: false,
    help: true,
    role: ['433870492378595329'],
    aliases: [],
	usage: '',
	cooldown: 0,
    func: (client, message, args) => {
        message.channel.send('Aisha, bangun ~').then(process.exit());
    }
}