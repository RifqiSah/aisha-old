module.exports = {
    name: "patch",
    desc: "Untuk memudahakan dalam menulis patchnote.",
    enable: true,
    regex: true,
    help: false,
    role: [],
    aliases: ['pn'],
	usage: '[bulan] [nomor]',
	cooldown: 0,
    func: (client, message, args) => {
        message.delete();
        
        let data = [];
        let channel = message.guild.channels.find(ch => ch.id === '381495270241730561'); // dn-sea
        if (!channel) return;
        
        data.push("<@&489292018628165633>\n");
        data.push(`__**[Patchnote] ${args[0]} Patchnote**__`);
        data.push(`https://sea.dragonnest.com/news/notice/all/${args[1]}`);

        channel.send(data);
    }
}