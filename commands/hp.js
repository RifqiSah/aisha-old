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
        let nest = (args.length ? args.join(" ").toLowerCase() : "null");
        let data = [];

        let nests = ""; // nest.replace(/\b\w/g, l => l.toUpperCase()).replace(/\b[a-zA-Z]{2,3}\b/g, i => i.toUpperCase());
        if (nest == "gdn" || nest == "green") nests = "Green Dragon Nest";
        else if (nest == "fdn" || nest == "forest") nests = "Forest Dragon Nest";
        else if (nest == "bdn" || nest == "black") nests = "Black Dragon Nest";
        else if (nest == "gudn" || nest == "gust") nests = "Gust Dragon Nest";
        else if (nest == "stg" || nest == "sunset") nests = "Sunset Traning Ground";
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
                data.push("Hirendel's Pet Mushroom Kayampa: __**3.55 Trillion**__");
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

            case /\bstg|sunset\b/g.test(nest):
                data.push("Easy: Boss HP is **[399.708.160]** and minimum DPS is **[1.332.361]**");
                data.push("Normal: Boss HP is **[600.487.488]** and minimum DPS is **[2.001.625]**");
                data.push("Hard: Boss HP is **[800.341.568]** and minimum DPS is **[2.667.805]**");
                data.push("Master: Boss HP is **[1.000.194.648]** and minimum DPS is **[3.333.985]**");
                data.push("Abyss: Boss HP is **[1.200.049.792]** and minimum DPS is **[4.000.166]**");
                data.push("1F: Boss HP is **[2.035.550.848]** and minimum DPS is **[6.785.169]**");
                data.push("2F: Boss HP is **[3.377.163.776]** and minimum DPS is **[11.257.213]**");
                data.push("3F: Boss HP is **[6.358.320.642]** and minimum DPS is **[21.194.402]**");
                data.push("4F: Boss HP is **[11.972.739.072]** and minimum DPS is **[39.909.130]**");
                data.push("5F: Boss HP is **[22.547.425.280]** and minimum DPS is **[75.158.084]**");
                data.push("6F: Boss HP is **[42.464.366.592]** and minimum DPS is **[141.547.889]**");
                data.push("7F: Boss HP is **[79.980.494.848]** and minimum DPS is **[266.601.649]**");
                data.push("8F: Boss HP is **[150.643.703.909]** and minimum DPS is **[502.145.678]**");
                data.push("9F: Boss HP is **[283.742.797.824]** and minimum DPS is **[945.809.326]**");
                data.push("10F: Boss HP is **[534.442.213.376]** and minimum DPS is **[1.781.474.045]**");
                data.push("11F: Boss HP is **[1.006.649.212.928]** and minimum DPS is **[3.355.497.376]**");
                data.push("12F: Boss HP is **[1.895.519.617.026]** and minimum DPS is **[6.318.398.723]**");
                data.push("13F: Boss HP is **[3.569.263.050.752]** and minimum DPS is **[11.897.543.503]**");
                data.push("14F: Boss HP is **[6.720.922.320.896]** and minimum DPS is **[22.403.074.403]**");
                data.push("15F: Boss HP is **[12.655.496.527.872]** and minimum DPS is **[42.184.988.426]**");
                break;

            default:
                data.push(`HP untuk \`${nests}\` tidak ditemukan!`);
                break;
        }

        data.push(`\nGunakan \`${client.config.PREFIX}help hp\` untuk melihat info yang tersedia.`);
        message.channel.send(data, { split: true });
    }
}