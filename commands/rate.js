module.exports = {
    name: "rate",
    desc: "Melihat info rate dari Dragon Nest. Rate yang tersedia yaitu:\`\`\`- calypse\n- skila\n- fdn\n- ancient\n- taliman\n- jade\n- acc\n- fishing\n- seafishing\n- fusi\`\`\`",
    enable: true,
    regex: false,
    help: true,
    role: [],
    aliases: [],
	usage: '[jenis rate]',
	cooldown: 0,
    func: (client, message, args) => {
        let rate = args.join(" ").toLowerCase();
        let data = [];

        data.push("__**Rate Untuk " + rate.replace(/\b\w/g, l => l.toUpperCase()) + "**__\n");

        switch(true) {
            case /\callypse|calip|calypse|calipse|kelip\b/g.test(rate):
                data.push("`Tier 1`: https://i.imgur.com/CMLeTwt.png");
                data.push("`Tier 2`: https://i.imgur.com/dXNPCON.png");
                data.push("`Tier 3`: https://i.imgur.com/TVTHPfm.png");
                break;

            case /\bskila|scylla|skilla\b/g.test(rate):
                data.push("https://i.imgur.com/gJgXC7s.png");
                break;

            case /\bfdn|forest|wepon|weapon\b/g.test(rate):
                data.push("https://i.imgur.com/0IV0n3M.png");
                break;

            case /\bancient|armor|skill\b/g.test(rate):
                data.push("https://i.imgur.com/lWIvpby.png");
                break;

            case /\bacc|ring|earring|ear|neck|nek\b/g.test(rate):
                data.push("`Rate` : https://cdn.discordapp.com/attachments/418464661566914584/657620418563407883/unknown.png")
                data.push("`Bahan`: https://cdn.discordapp.com/attachments/418464661566914584/657620284731293728/unknown.png");
                break;

            case /\btalis|talisman\b/g.test(rate):
                data.push("https://media.discordapp.net/attachments/519116465908219904/519116489362505729/guardian_talisman.png");
                break;

            case /\bjade|jewel\b/g.test(rate):
                data.push("`Champion`: https://cdn.discordapp.com/attachments/597969449340895247/597978448622911501/2019070717144963454.png");
                data.push("`Flawless`: https://cdn.discordapp.com/attachments/597969449340895247/597978678693068800/2019070717212085581.png");
                break;

            case /\bfishing|mancing\b/g.test(rate):
                data.push("Red Bass = 7.7%");
                data.push("Hermalte Trout = 7.7%");
                data.push("Brown Striped Salmon = 7.7%");
                data.push("Rough Rock Grouper = 7.7%");
                data.push("Freshwater Sweet fish = 7.7%");
                data.push("Black Swamp Snake head = 7.7%");
                data.push("Gizzard Shard = 7.7%\n");

                data.push("Golden Carp = 5.91%");
                data.push("Rainbow Trout = 5.91%");
                data.push("Rosy Bitterling = 5.91%");
                data.push("Catfish = 5.91%");
                data.push("Mudskipper = 5.91%\n");

                data.push("Lamprey = 0.04%");
                data.push("Arowana = 0.04%\n");

                data.push("Antique Common Pouch = 17% ");
                data.push("Magical Rainbow Goldfish = 0.0044%");
                break;
            
            case /\bseafishing|event mancing\b/g.test(rate):
                data.push("Shrimp = 22.5%");
                data.push("Webfoot Octopus = 22.5%");
                data.push("Lobster = 3.75%");
                data.push("Anemone Fish = 11.8%");
                data.push("Butterfly Fish = 11.8%");
                data.push("Fugu = 11.3%");
                data.push("Octopus = 3%");
                data.push("Turtle = 3%");
                data.push("Stingray = 2.6%");
                data.push("Halibut = 2.6%");
                data.push("Snapper = 2.6%");
                data.push("Deep sea Fish = 1.1%");
                data.push("Tuna = 0.8% ");
                data.push("Whale = 0.2%");
                data.push("Shark = 0.25%");
                data.push("Sea Fishing Pouch = 3%");
                data.push("Rare Top Mimi Octopus = 3%\n");
                
                data.push("Shrimp up to Deep Sea Fish have 10 Different Sizes");
                data.push("Tune , Whale and Shark have 20 Different Sizes");
                break;

            case /\bfusi|fusion|cost|cosu|cossu|cost|costume|kostum\b/g.test(rate):
                data.push("https://cdn.discordapp.com/attachments/526456830193434624/659156809382232077/cash_synthesis_rate_dnsea.png");
                break;

            case /\bmount\b/g.test(rate):
                data.push("`Current in SEA`: https://cdn.discordapp.com/attachments/598027048220491776/598033562297434155/U1iGyFa.png");
                data.push("`Future in SEA (Current in KR)`: https://cdn.discordapp.com/attachments/526456830193434624/634019881314025472/92rUvBz.png");
                break;

            default:
                data.push(`Rate untuk \`${rate}\` tidak ditemukan!`);
                break;
        }

        data.push(`\nGunakan \`${client.config.PREFIX}help rate\` untuk melihat rate yang tersedia.`);
        message.channel.send(data, { split: true });
    }
}