module.exports = {
    name: 'info',
    desc: 'Melihat info hal-hal yang ada pada Dragon Nest. Info yang tersedia yaitu: ```- mq\n- sp/np\n- cloister\n- hero talisman/epic talisman\n- goddess heraldry/heraldry\n- nm/nightmare\n- f14debuff/f14 debuff```',
    enable: true,
    regex: false,
    help: true,
    role: [],
    aliases: [],
    usage: '[jenis info]',
    cooldown: 0,
    func: (client, message, args) => {
        const info = (args.length ? args.join(' ').toLowerCase() : 'null');
        const data = [];

        const infos = info.replace(/\b\w/g, (l) => l.toUpperCase()).replace(/\b[a-zA-Z]{2,3}\b/g, (i) => i.toUpperCase());
        data.push(`__**Info Untuk ${infos}**__\n`);

        switch (true) {
        case /\bmq|mainquest|cp\b/g.test(info):
            data.push('https://cdn.discordapp.com/attachments/432903741029613569/560061874406686721/unknown.png');
            break;

        case /\bnest|dungeon|sp|np|stage point|nest point\b/g.test(info):
            data.push('https://cdn.discordapp.com/attachments/526456830193434624/666496405740847115/unknown.png');
            break;

        case /\bcloister|sunset\b/g.test(info):
            data.push('https://i.imgur.com/kzFZTTh.png');
            break;

        case /\bhero talisman|epic talisman\b/g.test(info):
            data.push('https://i.imgur.com/JxaRyuC.png');
            break;

        case /\bgoddess heraldry|heraldry\b/g.test(info):
            data.push('`Warrior`: https://cdn.discordapp.com/attachments/690593970891259935/690595171871490098/unknown.png');
            data.push('`Archer`: https://cdn.discordapp.com/attachments/690593970891259935/690595462545145886/unknown.png');
            data.push('`Sorceress`: https://cdn.discordapp.com/attachments/690593970891259935/690595569156227112/unknown.png');
            data.push('`Cleric`: https://cdn.discordapp.com/attachments/690593970891259935/690595636898299934/unknown.png');
            data.push('`Academic`: https://cdn.discordapp.com/attachments/690593970891259935/690595781723291688/unknown.png');
            data.push('`Kali`: https://cdn.discordapp.com/attachments/690593970891259935/690595899721646140/unknown.png');
            data.push('`Assassin`: https://cdn.discordapp.com/attachments/690593970891259935/690596141368082462/unknown.png');
            data.push('`Lancea`: https://cdn.discordapp.com/attachments/690593970891259935/690596304023322744/unknown.png');
            data.push('`Machina`: https://cdn.discordapp.com/attachments/690593970891259935/690596367525085204/unknown.png');

            data.push('\nDamage Increase and chance rate for classes with three (3) types of heraldry');
            data.push('<https://discordapp.com/channels/519095341325221900/690593970891259935/690596760506204212>');

            data.push('\nDamage Increase and chance rate for classes with four (4) types of heraldry');
            data.push('<https://cdn.discordapp.com/attachments/690593970891259935/690596907319427112/unknown.png>');

            data.push('\nDamage Increase and chance rate for classes with five (5) types of heraldry');
            data.push('<https://cdn.discordapp.com/attachments/690593970891259935/690597010859884544/unknown.png>');
            break;

        case /\bnest debuff\b/g.test(info):
            data.push('https://cdn.discordapp.com/attachments/669038861388742666/669038889947758592/unknown.png');
            break;

        case /\braid stats recommendation|raid recom\b/g.test(info):
            data.push('https://cdn.discordapp.com/attachments/580444014218838041/713034595553116241/unknown_1.png');
            break;

        default:
            data.push(`Info untuk \`${infos}\` tidak ditemukan!`);
            break;
        }

        data.push(`\nGunakan \`${client.config.PREFIX}help info\` untuk melihat info yang tersedia.`);
        message.channel.send(data, { split: true });
    },
};
