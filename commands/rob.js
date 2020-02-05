module.exports = {
    name: "rob",
    desc: "Memberikan informasi untuk `Rock of Blessing` yang sedang ada pada server!",
    enable: true,
    regex: true,
    help: true,
    role: ['489292018628165633'],
    aliases: [],
	usage: '',
	cooldown: 0,
    func: (client, message, args) => {
        let data = [];

        data.push("`29 Jan 2019`");
        data.push("04:48 `pXxirang` (GM), mungkit BOT.\n");
        data.push("`30 Jan 2020`");
        data.push("04:11 `**BOT**`");
        data.push("15:37 `AVANGEDFOD` (DA)");
        data.push("\nWaktu diatas dalam `**GMT+8**`. Sumber: **Dragon Nest SEA Discord**");

        message.channel.send(data, { split: true });
    }
}