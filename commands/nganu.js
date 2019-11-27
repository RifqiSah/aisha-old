module.exports = {
    name: "nganu",
    desc: "Nganu?",
    enable: true,
    regex: true,
    help: false,
    role: [],
    aliases: ['anu', 'eww'],
	usage: '',
	cooldown: 0,
    func: (client, message, args) => {
        message.channel.send("( ͡° ͜ʖ ͡°)");
    }
}