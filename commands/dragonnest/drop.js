module.exports = {
    name: 'drop',
    desc: 'Melihat info drop rate dari sebuah item pada Dragon Nest. Item yang tersedia yaitu: ```- lapis\n- celestone\n- fishing/mancing\n- seafishing/event mancing\n- nm/nightmare/epic talisman/hero talisman\n- mino/minos```',
    enable: true,
    regex: false,
    help: true,
    role: [],
    aliases: [],
    usage: '[jenis item]',
    cooldown: 0,
    func: (client, message, args) => {
        const item = (args.length ? args.join(' ').toLowerCase() : 'null');
        const data = [];

        const items = item.replace(/\b\w/g, (l) => l.toUpperCase()).replace(/\b[a-zA-Z]{2,3}\b/g, (i) => i.toUpperCase());
        data.push(`__**Drop Rate Untuk Item ${items}**__\n`);

        switch (true) {
        case /\blapis\b/g.test(item):
            data.push('Easy = 0%');
            data.push('Norm = 0.3%');
            data.push('Hard = 1.7%');
            data.push('Master = 3.4%');
            data.push('Abyss = 10%');
            data.push('F1 = 12%');
            data.push('F2 = 14%');
            data.push('F3 = 17%');
            data.push('F4 = 19%');
            data.push('F5 = 23%');
            data.push('F6 = 27%');
            data.push('F7 = 31%');
            data.push('F8 = 36%');
            data.push('F9 = 43%');
            data.push('F10 = 50%');
            data.push('F11 = 58%');
            break;

        case /\bcelestone\b/g.test(item):
            data.push('Dungeon Boss Drop = 1%');
            data.push('Invader Boss Drop = 1%');
            data.push('Nest End Chest = 1%');
            break;

        case /\bfishing|mancing\b/g.test(item):
            data.push('Red Bass = 7.7%');
            data.push('Hermalte Trout = 7.7%');
            data.push('Brown Striped Salmon = 7.7%');
            data.push('Rough Rock Grouper = 7.7%');
            data.push('Freshwater Sweet fish = 7.7%');
            data.push('Black Swamp Snake head = 7.7%');
            data.push('Gizzard Shard = 7.7%\n');

            data.push('Golden Carp = 5.91%');
            data.push('Rainbow Trout = 5.91%');
            data.push('Rosy Bitterling = 5.91%');
            data.push('Catfish = 5.91%');
            data.push('Mudskipper = 5.91%\n');

            data.push('Lamprey = 0.04%');
            data.push('Arowana = 0.04%\n');

            data.push('Antique Common Pouch = 17% ');
            data.push('Magical Rainbow Goldfish = 0.0044%');
            break;

        case /\bseafishing|event mancing\b/g.test(item):
            data.push('Shrimp = 22.5%');
            data.push('Webfoot Octopus = 22.5%');
            data.push('Lobster = 3.75%');
            data.push('Anemone Fish = 11.8%');
            data.push('Butterfly Fish = 11.8%');
            data.push('Fugu = 11.3%');
            data.push('Octopus = 3%');
            data.push('Turtle = 3%');
            data.push('Stingray = 2.6%');
            data.push('Halibut = 2.6%');
            data.push('Snapper = 2.6%');
            data.push('Deep sea Fish = 1.1%');
            data.push('Tuna = 0.8% ');
            data.push('Whale = 0.2%');
            data.push('Shark = 0.25%');
            data.push('Sea Fishing Pouch = 3%');
            data.push('Rare Top Mimi Octopus = 3%\n');

            data.push('Shrimp up to Deep Sea Fish have 10 Different Sizes');
            data.push('Tune , Whale and Shark have 20 Different Sizes');
            break;

        case /\bnm|nightmare|epic talisman|hero talisman\b/g.test(item):
            data.push('`Nightmare Silver & Gold Chest Selection`: https://media.discordapp.net/attachments/580444014218838041/713316510214520832/unknown_1.png');
            break;

        case /\bmino|minos\b/g.test(item):
            data.push('**F14**: 2% => 0.5% for each part');
            data.push('**F15**: 4% => 0.8% for each part');
            data.push('**F16**: 8% => 1.6% for each part');
            data.push('**F17**: 16% => 3.2% for each part');
            data.push('\n__**For Minos Fragments and enhance rate using `.rate minos`.**__');
            break;

        default:
            data.push(`Drop rate untuk item \`${items}\` tidak ditemukan!`);
            break;
        }

        data.push(`\nGunakan \`${client.config.PREFIX}help drop\` untuk melihat daftar item yang tersedia.`);
        message.channel.send(data, { split: true });
    },
};
