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
        data.push("Tidak ada");
        data.push("★ BOT: Event handler sudah full diexport kedalam file terpisah.");
        // data.push("★ Module `hp`: Command gdn, fdn, bdn.");
        // data.push("★ Module `info`: Command hero talisman/epic talisman dan nm/nightmare.");

        data.push("\n**Perubahan:**");
        data.push("Tidak ada");
        // data.push("★ Memindahkan reaction add dan remove kedalam event handler.");
        // data.push("★ Log member masuk & keluar");

        data.push("\n**Penghapusan:**");
        data.push("Tidak ada");

        message.channel.send(data, { split: true });
    }
}