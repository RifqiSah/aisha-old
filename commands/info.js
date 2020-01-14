module.exports = {
    name: "info",
    desc: "Melihat info hal-hal yang ada pada Dragon Nest. Info yang tersedia yaitu:\`\`\`- mq\n- sp/np\`\`\`",
    enable: true,
    regex: false,
    help: true,
    role: [],
    aliases: [],
	usage: '[jenis info]',
	cooldown: 0,
    func: (client, message, args) => {
        let info = args.join(" ").toLowerCase();
        let data = [];

        data.push("__**Info Untuk " + info.replace(/^\w/, c => c.toUpperCase()) + "**__\n");

        switch(true) {
            case /\bmq|mainquest|cp\b/g.test(info):
                data.push("https://cdn.discordapp.com/attachments/432903741029613569/560061874406686721/unknown.png");
                break;

            case /\bnest|dungeon|sp|np|stage point|nest point\b/g.test(info):
                data.push("https://cdn.discordapp.com/attachments/526456830193434624/666496405740847115/unknown.png");
                break;

            default:
                data.push(`Info untuk \`${info}\` tidak ditemukan!`);
                break;
        }

        data.push(`\nGunakan \`${client.config.PREFIX}help info\` untuk melihat info yang tersedia.`);
        message.channel.send(data, { split: true });
    }
}