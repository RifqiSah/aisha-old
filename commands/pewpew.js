module.exports = {
    name: "pewpew",
    desc: "Pewpew?",
    enable: true,
    regex: true,
    help: false,
    role: [],
    aliases: ['pew'],
	usage: '',
	cooldown: 0,
    func: (client, message, args) => {
        message.channel.send("╰( ͡° ͜ʖ ͡° )つ──☆*:・ﾟ pew pew magic");
    }
}