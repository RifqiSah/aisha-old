module.exports = {
    desc: "Biarkan Aisha berbicara.",
    enable: true,
    regex: false,
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