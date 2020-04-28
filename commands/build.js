module.exports = {
    name: "build",
    desc: "Menjalankan ulang Aisha dari server.",
    enable: true,
    regex: false,
    help: false,
    role: ['433870492378595329'],
    aliases: [],
	usage: '',
	cooldown: 0,
    func: (client, message, args) => {
        message.channel.send('Building new Aisha instance.');
        process.exit();
    }
}