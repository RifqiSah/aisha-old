module.exports = {
    name: 'changelog',
    desc: 'Melihat _changelog_ atau perubahan yang terjadi pada Aisha.',
    enable: true,
    regex: false,
    help: true,
    role: [],
    aliases: ['log'],
    usage: '',
    cooldown: 0,
    // eslint-disable-next-line no-unused-vars
    func: (client, message, args) => {
        const data = [];

        data.push(`__**Version ${client.config.VERSION} Changelog**__`);

        data.push('\n**Penambahan:**');
        // data.push("Tidak ada");
        // data.push("★ BOT: Command noblesse buff dan rob ditambahkan.");
        // data.push("★ Module `drop` ditambahkan.");
        data.push('★ Module `info`: Command goddess heraldry/heraldry ditambahkan.');

        data.push('\n**Perubahan:**');
        data.push('Tidak ada');
        // data.push("★ Memindahkan reaction add dan remove kedalam event handler.");
        // data.push("★ BOT: Perubahan metode verifikasi untuk member baru.");

        data.push('\n**Penghapusan:**');
        data.push('Tidak ada');

        message.channel.send(data, { split: true });
    },
};
