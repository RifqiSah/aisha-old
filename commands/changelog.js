module.exports = {
    name: "changelog",
    desc: "Melihat _changelog_ yang terjadi pada Aisha.",
    enable: true,
    regex: false,
    help: true,
    role: [],
    aliases: ['log'],
	usage: '',
	cooldown: 0,
    func: (client, message, args) => {
        let data = [];

        data.push(`__**Version ${client.config.VERSION} Changelog**__`);

        data.push("\n**Penambahan:**");
        // data.push("Tidak ada");
        data.push("★ BOT: Command noblesse buff.");
        // data.push("★ Module `hp`: Command sunset.");
        data.push("★ Module `info`: Command f14debuff/f14 debuff ditambahkan.");

        data.push("\n**Perubahan:**");
        data.push("Tidak ada");
        // data.push("★ Memindahkan reaction add dan remove kedalam event handler.");
        // data.push("★ Log member masuk & keluar");

        data.push("\n**Penghapusan:**");
        data.push("Tidak ada");

        message.channel.send(data, { split: true });
    }
}