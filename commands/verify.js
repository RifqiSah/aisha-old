module.exports = {
    name: "verify",
    desc: "Untuk verifikasi member yang baru bergabung pada Discord.",
    enable: true,
    regex: false,
    help: false,
    role: [],
    aliases: ['verif', 'verifikasi', 'v'],
	usage: '[nomor hp]',
	cooldown: 0,
    func: (client, message, args) => {
        let channel = message.guild.channels.find(ch => ch.id === '652149362423627787'); // member-phone
        if (!channel) return;

        let no = args[0];
        if (!isNaN(no)) {
            if (no.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)) { // pastikan nomor hp yang dimasukkan
                channel.send(`\`${message.author.tag}\` telah melakukan registrasi dengan nomor: \`${no}\``);

                message.channel.send(`Terima kasih sidah melakukan verifikasi, ${message.guild.roles.get(`498835247345958922`)} kami akan memproses akun Anda secepatnya.`).then(msg => {msg.delete(5000)}).catch();
                message.delete();
            }
        } else
            return message.channel.send("Harap masukkan nomor yang valid!").then(msg => {msg.delete(5000)}).catch();
    }
}