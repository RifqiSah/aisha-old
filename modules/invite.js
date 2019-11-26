module.exports = {
    desc: "",
    enable: true,
    regex: true,
    help: false,
    role: [],
    aliases: ['inv', 'invt', 'invit'],
	usage: '',
	cooldown: 0,
    func: (client, message, args) => {
        message.channel.send("Link invite server: https://discord.gg/YvpEtYd");
    }
}