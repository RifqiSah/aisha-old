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
        data.push("★ BOT: Command `changelog` untuk melihat perubahan yang terjadi pada Aisha.");
        data.push("★ Module `rate`: Command bdn, mirage, paraselene, dj, celestone, lapis, conversion weapon/tf weapon, dan robot pet.");
        data.push("★ Module `info`: Command hero talisman/epic talisman dan nm/nightmare.");

        data.push("\n**Perubahan:**");
        data.push("Tidak ada");

        data.push("\n**Penghapusan:**");
        data.push("Tidak ada")

        message.channel.send(data, { split: true });
    }
}