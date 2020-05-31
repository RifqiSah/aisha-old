module.exports = {
    name: 'agree',
    desc: 'Untuk verifikasi member apakah menyetujui peraturan yang dibuat.',
    enable: true,
    regex: false,
    help: false,
    role: ['669544469594374145'],
    aliases: ['setuju', 'ya'],
    usage: '',
    cooldown: 0,
    // eslint-disable-next-line no-unused-vars
    func: (client, message, args) => {
        const channel = message.guild.channels.find((ch) => ch.id === '652149362423627787'); // member-agreement
        if (!channel) return;

        channel.send(`\`${message.author.tag}\` telah menyetujui peraturan!`);
        message.reply('Terima kasih Anda sudah menyetujui peraturan yang telah dibuat.\n\nJika Anda kedapatan melanggar, kami akan segera mengeluarkan Anda dari Discord demi kenyamanan member lain.\n\nTerima kasih.').then((msg) => { msg.delete({ timeout: 10000 }); }).catch();

        message.delete();
        message.member.roles.remove('669544469594374145'); // new-member
        message.member.roles.add('668439117264191498'); // buat rolenya guest aja sementara
    },
};
