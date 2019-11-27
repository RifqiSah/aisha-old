module.exports = {
    name: "say",
    desc: "Aisha akan berbicara sesuai dengan yang kita ketikkan.",
    enable: true,
    regex: false,
    help: true,
    role: ['433870492378595329'],
    aliases: [],
	usage: '[channel] [pesan anda]',
	cooldown: 0,
    func: (client, message, args) => {
        const channel = message.mentions.channels.first();
        if (!channel) {
            message.channel.send("Mohon masukkan channel!");
            return;
        }
            
        args.shift();
        let sayMessage = args.join(" ");
        if (!sayMessage) {
            message.channel.send("Mohon masukkan pesan anda!");
            return;
        }

        message.delete().catch(O_o=>{});
        channel.send(sayMessage);
    }
}