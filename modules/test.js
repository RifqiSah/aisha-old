module.exports = {
    desc: "Menguji coba fitur baru pada Aisha.",
    enable: true,
    regex: false,
    help: false,
    role: ['433870492378595329'],
    aliases: [],
	usage: '',
	cooldown: 0,
    func: (client, message, args) => {
        message.channel.send('Dalam perbaikan!');
    }
}