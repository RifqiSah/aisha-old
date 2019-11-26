module.exports = {
    desc: "Melihat info rate dari Dragon Nest. Rate yg tersedia yaitu [calypse, skila, fdn, ancient, ~~acc~~, taliman, jade]",
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

        data.push("__**Rate Untuk " + rate.replace(/^\w/, c => c.toUpperCase()) + "**__\n");

        switch(rate) {
            case "calypse":
                data.push("`Tier 1`: https://i.imgur.com/CMLeTwt.png");
                data.push("`Tier 2`: https://i.imgur.com/dXNPCON.png");
                data.push("`Tier 3`: https://i.imgur.com/TVTHPfm.png");
                break;

            case "skila":
                data.push("https://i.imgur.com/gJgXC7s.png");
                break;

            case "fdn":
                data.push("https://i.imgur.com/0IV0n3M.png");
                break;

            case "ancient":
                data.push("https://i.imgur.com/lWIvpby.png");
                break;

            // case "acc":
            //     data.push("https://i.imgur.com/0IV0n3M.png");
            //     break;

            case "talisman":
                data.push("https://media.discordapp.net/attachments/519116465908219904/519116489362505729/guardian_talisman.png");
                break;

            case "jade":
                data.push("`Champion`: https://cdn.discordapp.com/attachments/597969449340895247/597978448622911501/2019070717144963454.png");
                data.push("`Flawless`: https://cdn.discordapp.com/attachments/597969449340895247/597978678693068800/2019070717212085581.png");
                break;

            default:
                data.push("Tidak ditemukan!");
                break;
        }

        message.channel.send(data, { split: true });
    }
}