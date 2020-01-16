module.exports = {
    name: "info",
    desc: "Melihat info hal-hal yang ada pada Dragon Nest. Info yang tersedia yaitu:\`\`\`- mq\n- sp/np\n- cloister\n- hero talisman/epic talisman\`\`\`",
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

        data.push("__**Info Untuk " + info.replace(/\b\w/g, l => l.toUpperCase()) + "**__\n");

        switch(true) {
            case /\bmq|mainquest|cp\b/g.test(info):
                data.push("https://cdn.discordapp.com/attachments/432903741029613569/560061874406686721/unknown.png");
                break;

            case /\bnest|dungeon|sp|np|stage point|nest point\b/g.test(info):
                data.push("https://cdn.discordapp.com/attachments/526456830193434624/666496405740847115/unknown.png");
                break;

            case /\bcloister|sunset\b/g.test(info):
                data.push("https://i.imgur.com/kzFZTTh.png");
                break;

            case /\bhero talisman|epic talisman\b/g.test(info):
                data.push("https://i.imgur.com/JxaRyuC.png");
                break;

            case /\bnm|nightmare\b/g.test(info):
                data.push("`Stage 1 & Stage 2 Bosses Drop rate`: https://i.imgur.com/eHmjgRw.png");
                data.push("`Nightmare Silver & Gold Chest Selection`: https://i.imgur.com/9tgxCMw.png");
                break;

            default:
                data.push(`Info untuk \`${info}\` tidak ditemukan!`);
                break;
        }

        data.push(`\nGunakan \`${client.config.PREFIX}help info\` untuk melihat info yang tersedia.`);
        message.channel.send(data, { split: true });
    }
}