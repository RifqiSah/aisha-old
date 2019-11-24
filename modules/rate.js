module.exports = {
    desc: "Melihat info rate dari Dragon Nest. Rate yg tersedia yaitu [calypse, skila, fdn, ancient, ~~acc~~, taliman, jade]",
    enable: true,
    regex: true,
    role: [],
    aliases: [],
	usage: '[jenis rate]',
	cooldown: 0,
    func: (client, message, args) => {
        let rate = args.join(" ").toLowerCase();
        switch(rate) {
            case "calypse":
                message.channel.send(`__**Rate Untuk ${rate}**__\n\nTier 1: https://i.imgur.com/CMLeTwt.png\nTier 2: https://i.imgur.com/dXNPCON.png\nTier 3: https://i.imgur.com/TVTHPfm.png`);
                break;

            case "skila":
                message.channel.send(`__**Rate Untuk ${rate}**__\n\nhttps://i.imgur.com/gJgXC7s.png`);
                break;

            case "fdn":
                message.channel.send(`__**Rate Untuk ${rate}**__\n\nhttps://i.imgur.com/0IV0n3M.png`);
                break;

            case "ancient":
                message.channel.send(`__**Rate Untuk ${rate}**__\n\nhttps://i.imgur.com/lWIvpby.png`);
                break;

            // case "acc":
            //     message.channel.send(`__**Rate Untuk ${rate}**__\n\nhttps://i.imgur.com/0IV0n3M.png`);
            //     break;

            case "talisman":
                message.channel.send(`__**Rate Untuk ${rate}**__\n\nhttps://media.discordapp.net/attachments/519116465908219904/519116489362505729/guardian_talisman.png`);
                break;

            case "jade":
                message.channel.send(`__**Rate Untuk ${rate}**__\n\nChampion: https://cdn.discordapp.com/attachments/597969449340895247/597978448622911501/2019070717144963454.png\nFlawless: https://cdn.discordapp.com/attachments/597969449340895247/597978678693068800/2019070717212085581.png`);
                break;

            default:
                message.reply("Rate untuk `" + rate + "`tidak ditemukan atau belum terdaftar!").then(msg => {msg.delete(5000)}).catch();
                break;
        }
    }
}