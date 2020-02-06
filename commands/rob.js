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

        data.push("**6 Feb 2020**");
        data.push("15:56 `KeikoReef` (PSY)\n");
        data.push("2 kemungkiann BOT dan sudah habis, selamat mencari RoB :)");
        data.push("\nWaktu diatas dalam **GMT+8**.");

        message.channel.send(data, { split: true });
    }
}