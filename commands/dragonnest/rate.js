module.exports = {
    name: 'rate',
    desc: 'Melihat info rate enhance, dan chance apapun (kecuali drop) pada Dragon Nest. Rate yang tersedia yaitu: ```- calypse\n- skila\n- fdn\n- goddess armor\n- bdn armor\n- acc\n- guardian talisman\n- jade\n- mirage\n- paraselene\n- dj/ddj/mj/bmj\n- fusi\n- mount\n- conversion weapon/tf weapon\n- tf fragment/fragment tf\n- robot pet\n- powder/bubuk\n- mino/minos```',
    enable: true,
    regex: false,
    help: true,
    role: [],
    aliases: [],
    usage: '[jenis rate]',
    cooldown: 0,
    func: (client, message, args) => {
        const rate = (args.length ? args.join(' ').toLowerCase() : 'null');
        const data = [];

        const rates = rate.replace(/\b\w/g, (l) => l.toUpperCase()).replace(/\b[a-zA-Z]{2,3}\b/g, (i) => i.toUpperCase());
        data.push(`__**Rate Untuk ${rates}**__\n`);

        switch (true) {
        case /\bcallypse|calip|calypse|calipse|kelip\b/g.test(rate):
            data.push('`Tier 1`: https://i.imgur.com/CMLeTwt.png');
            data.push('`Tier 2`: https://i.imgur.com/dXNPCON.png');
            data.push('`Tier 3`: https://i.imgur.com/TVTHPfm.png');
            break;

        case /\bskila|scylla|skilla\b/g.test(rate):
            data.push('https://i.imgur.com/gJgXC7s.png');
            break;

        case /\bfdn|forest|fdn wepon|fdn weapon\b/g.test(rate):
            data.push('https://i.imgur.com/0IV0n3M.png');
            break;

        case /\bgoddess armor|ancient armor\b/g.test(rate):
            data.push('https://i.imgur.com/lWIvpby.png');
            break;

        case /\bbdn armor\b/g.test(rate):
            data.push('https://i.imgur.com/4osWnMm.png');
            break;

        case /\bacc|ring|earring|ear|neck|nek\b/g.test(rate):
            data.push('`Rate` : https://cdn.discordapp.com/attachments/418464661566914584/657620418563407883/unknown.png');
            data.push('`Bahan`: https://cdn.discordapp.com/attachments/418464661566914584/657620284731293728/unknown.png');
            break;

        case /\bguardian talis|guardian talisman\b/g.test(rate):
            data.push('https://media.discordapp.net/attachments/519116465908219904/519116489362505729/guardian_talisman.png');
            break;

        case /\bjade|jewel\b/g.test(rate):
            data.push('`Champion`: https://cdn.discordapp.com/attachments/597969449340895247/597978448622911501/2019070717144963454.png');
            data.push('`Flawless`: https://cdn.discordapp.com/attachments/597969449340895247/597978678693068800/2019070717212085581.png');
            break;

        case /\bmirage\b/g.test(rate):
            data.push('https://i.imgur.com/5aPkiAr.png');
            break;

        case /\bparaselene\b/g.test(rate):
            data.push('https://i.imgur.com/yzZyjsp.png');
            break;

        case /\bdj|ddj|mj|bmj\b/g.test(rate):
            data.push('`1 to 10`: https://i.imgur.com/lpqdJw7.png');
            data.push('`11 to 15`: https://i.imgur.com/5hqmq3Y.png');
            break;

        case /\bfusi|fusion|cost|cosu|cossu|cost|costume|kostum\b/g.test(rate):
            data.push('https://cdn.discordapp.com/attachments/526456830193434624/659156809382232077/cash_synthesis_rate_dnsea.png');
            break;

        case /\bmount\b/g.test(rate):
            data.push('`Current in SEA`: https://cdn.discordapp.com/attachments/598027048220491776/598033562297434155/U1iGyFa.png');
            data.push('`Future in SEA (Current in KR)`: https://cdn.discordapp.com/attachments/526456830193434624/634019881314025472/92rUvBz.png');
            break;

        case /\bconversion weapon|tf weapon|tf wepon\b/g.test(rate):
            data.push('https://cdn.discordapp.com/attachments/519164580476223500/519168748075221001/Conversion_weapon_rate.png');
            break;

        case /\btf fragment|fragment tf\b/g.test(rate):
            data.push('Conversion Armor Fragment (10) : 9,05%');
            data.push('Conversion Armor Fragment (30) : 25,68%');
            data.push('Conversion Armor Fragment (50) : 43,26%');
            data.push('Conversion Armor Fragment (70) : 11,02%');
            data.push('Conversion Armor Fragment (100) : 9,74%');
            data.push('Conversion Armor Fragment (500) : 1,08%');
            data.push('Conversion Armor Fragment (1000) : 0,14%');
            data.push('Conversion Armor Fragment (3000) : 0,02%');
            data.push('Conversion Thread :0,01%');
            break;

        case /\brobot pet\b/g.test(rate):
            data.push('How to Get Accessory =>');
            data.push('Step 1 - Exchange Legend Robot to get [Heart Pounding Pet Accessory Pouch]');
            data.push('Step 2 - Open Pouch');
            data.push('Step 3 - Get Love of Friend or Costume RNG from Pouch');
            data.push('https://i.imgur.com/o4NRzCV.png');
            break;

        case /\bpowder|bubuk\b/g.test(rate):
            data.push('https://cdn.discordapp.com/attachments/432903741029613569/673810283289903114/IMG_20191231_162056.png');
            break;

        case /\bmino|minos\b/g.test(rate):
            data.push('__**Fragments**__');
            data.push('**F11**: 1pc (60%), 2pcs (30%), 3pcs(10%) fragments');
            data.push('**F12**: 2pc (60%), 3pcs (30%), 4pcs(10%) fragments');
            data.push('**F13**: 3pc (60%), 4pcs (30%), 5pcs(10%) fragments\n');
            data.push('**F14**: 5pcs (98%) fragments');
            data.push('**F15**: 5pcs (96%) fragments');
            data.push('**F16**: 5pcs (92%) fragments');
            data.push('**F17**: 5pcs (84%) fragments');
            data.push('\n__**For F14 - F17, see Minos Gear drop rate using `.drop minos`.**__');
            data.push('\n__**Enhance rate**__');
            data.push('https://media.discordapp.net/attachments/695076346853982238/713908239560998942/unknown.png');
            break;

        default:
            data.push(`Rate untuk \`${rates}\` tidak ditemukan!`);
            break;
        }

        data.push(`\nGunakan \`${client.config.PREFIX}help rate\` untuk melihat rate yang tersedia.`);
        message.channel.send(data, { split: true });
    },
};
