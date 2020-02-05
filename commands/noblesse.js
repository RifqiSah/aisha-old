module.exports = {
    name: "noblesse",
    desc: "Memberikan informasi untuk `Noblesse Buff` oleh VVIP1!",
    enable: true,
    regex: false,
    help: false,
    role: ['489292018628165633'],
    aliases: ['nb'],
	usage: '[waktu] [gmt (angka)] [link foto]',
	cooldown: 0,
    func: (client, message, args) => {
        let argss = args.toString().split(/ +/g);
        console.log(args);
        let data = [];

        message.delete();

        let channel = message.guild.channels.find(ch => ch.id === '580444014218838041'); // dragonnest
        if (!channel) return;

        data.push("<@&489292018628165633>\n");
        data.push("Noblesse Buff akan di`kentutkan` oleh VVIP1 pada:");
        data.push(`Waktu: ${args[0]}`);
        data.push(`Timezone: GMT+${args[1].replace("GMT+", "")}`);
        data.push(`${args[3]}`);

        channel.send(data, { split: true });
    }
}