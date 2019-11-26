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
        message.channel.send("Link invite server dapat dilihat pada <#498123556413243412>");
    }
}