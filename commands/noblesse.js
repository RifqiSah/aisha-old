module.exports = {
    name: "noblesse",
    desc: "Memberikan informasi untuk `Noblesse Buff` oleh VVIP1!",
    enable: true,
    regex: false,
    help: false,
    role: ['489292018628165633'],
    aliases: ['nb'],
	usage: '[waktu] [gmt]',
	cooldown: 0,
    func: (client, message, args) => {
        let argss = args.split(/ +/g);
        let data = [];

        message.delete();

        let channel = message.guild.channels.find(ch => ch.id === '580444014218838041'); // dragonnest
        if (!channel) return;

        data.push("<@489292018628165633>\n");
        data.push("Noblesse Buff akan diluncurkan pada:");
        data.push(`Waktu: ${argss[0]}`);
        data.push(`Timezone: ${argss[1]}`);

        message.channel.send(data, { split: true });
    }
}