module.exports = {
    name: "ping",
    desc: "Mendapatkan latency kepada API server Discord.",
    enable: true,
    regex: false,
    help: true,
    role: [],
    aliases: [],
	usage: '',
	cooldown: 0,
    func: (client, message, args) => {
        message.channel.send('Pong! Latency is ' + parseInt(client.bot.ping) + 'ms.');
    }
}