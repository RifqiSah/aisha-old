module.exports = {
    name: "noblesse",
    desc: "Memberikan informasi untuk `Noblesse Buff` oleh VVIP1!",
    enable: true,
    regex: false,
    help: false,
    role: ['489292018628165633'],
    aliases: ['nb'],
	usage: '[tanggal] [waktu] [gmt (angka)] [link foto]',
	cooldown: 0,
    func: (client, message, args) => {
        let data = [];

        message.delete();

        let channel = message.guild.channels.find(ch => ch.id === '580444014218838041'); // dragonnest
        if (!channel) return;

        data.push("<@&489292018628165633>\n");
        data.push(`Noblesse Buff akan dikeluarkan oleh VVIP1 pada tanggal **${args[0]}**, pukul **${args[1]}** [GMT+${args[2].replace("GMT+", "")}]`);
        data.push(`<${args[3]}>`);
        // data.push("\nKetikkan `.iam noblesse info` pada `#bot-spam` untuk mendapatkan informasi.")

        channel.send(data, { split: true });
    }
}