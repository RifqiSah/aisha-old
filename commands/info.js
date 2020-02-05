module.exports = {
    name: "info",
    desc: "Melihat info hal-hal yang ada pada Dragon Nest. Info yang tersedia yaitu:\`\`\`- mq\n- sp/np\n- cloister\n- hero talisman/epic talisman\n- nm/nightmare\n- f14debuff/f14 debuf\`\`\`",
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

        let infos = info.replace(/\b\w/g, l => l.toUpperCase()).replace(/\b[a-zA-Z]{2,3}\b/g, i => i.toUpperCase());
        data.push("__**Info Untuk " + infos + "**__\n");

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

                case /\bf14debuff|f14 debff\b/g.test(info):
                    data.push("https://cdn.discordapp.com/attachments/669038861388742666/669038889947758592/unknown.png");
                    break;
            default:
                data.push(`Info untuk \`${infos}\` tidak ditemukan!`);
                break;
        }

        data.push(`\nGunakan \`${client.config.PREFIX}help info\` untuk melihat info yang tersedia.`);
        message.channel.send(data, { split: true });
    }
}