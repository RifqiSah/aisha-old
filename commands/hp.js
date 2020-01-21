module.exports = {
    name: "hp",
    desc: "Informasi mengenai jumlah HP dari nest. HP yang tersedia yaitu:\`\`\`- GDN\n- FDN\n- BDN\`\`\`",
    enable: true,
    regex: false,
    help: true,
    role: [],
    aliases: [],
	usage: '[jenis nest]',
	cooldown: 0,
    func: (client, message, args) => {
        let nest = args.join(" ").toLowerCase();
        let data = [];

        let nests = ""; // nest.replace(/\b\w/g, l => l.toUpperCase()).replace(/\b[a-zA-Z]{2,3}\b/g, i => i.toUpperCase());
        if (nest == "gdn") nests = "Green Dragon Nest";
        else if (nest == "fdn") nests = "Forest Dragon Nest";
        else if (nest == "bdn") nests = "Black Dragon Nest";
        else if (nest === "gudn" || nest == "gust") nests = "Gust Dragon Nest";
        else nests = nest;

        data.push("__**HP Untuk " + nests + "**__\n");

        switch(true) {
            case /\bgdn|green\b/g.test(nest):
                data.push("Golem Morgon: __**372,104,320,000**__");
                data.push("White-eyed Krakes: __**996,708,000,000**__");
                data.push("Swam Queen Zabel: __**916,971,360,000**__");
                data.push("Sorcerer Karahan: __**2,392,099,200,000**__");
                data.push("Green Dragon Karahan (79%): __**8,970,372,000,000**__");
                break;

            case /\bfdn|forest\b/g.test(nest):
                data.push("Grandmother Merigirion: __**3.55 Trillion**__");
                data.push("Hirendel's Young Tree Tourte: __**3.55 Trillion**__");
                data.push("Hirendel's Pet Mushroom Kayampa: 3.55 Trillion**__");
                data.push("Vine Aux Monster: __**18.11 Trillion**__");
                data.push("Hireldel's Dancer Lamina: __**888 Billion**__");
                data.push("Hireldel's Dancer Laguna: __**889 Billion**__");
                data.push("Action Leader Wakanu: __**1.33 Trillion**__");
                data.push("Hirendel's Fallen Dediqus: __**1.01 Trillion**__");
                data.push("Ancient City Guardian Midir: __**1.99 Trillion**__");
                data.push("Forest Dragon Boss: __**36.23 Billion**__");
                data.push("--");
                data.push("Total: __**71.13 Trillion**__");
                break;

            case /\bbdn|black\b/g.test(nest):
                data.push("Centurion Ogre Baopar: __**2.9 Trillion**__");
                data.push("Engata General Umbala: __**7.67 Trillion**__");
                data.push("Black Ring Punisher Meluka: __**13.43 Trillion**__");
                data.push("Chiliarch Titanion: __**19.59 Trillion**__");
                data.push("Black Dragon Feder: __**69.98 Billion**__");
                data.push("--");
                data.push("Total: __**113 Trillion**__");
                break;

            default:
                data.push(`HP untuk \`${nests}\` tidak ditemukan!`);
                break;
        }

        data.push(`\nGunakan \`${client.config.PREFIX}help hp\` untuk melihat info yang tersedia.`);
        message.channel.send(data, { split: true });
    }
}