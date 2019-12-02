module.exports = {
    name: "ping",
    desc: "Mendapatkan latency API dan BOT server Discord.",
    enable: true,
    regex: false,
    help: true,
    role: [],
    aliases: [],
	usage: '',
	cooldown: 0,
    func: (client, message, args) => {
        message.channel.send("Memeriksa ...").then(m => {
            let ping = m.createdTimestamp - message.createdTimestamp;
            let choices = ["Ini adalah latency saya", "Apakah baik-baik saja? Saya tidak dapat melihat", "Saya berharap ini tidak buruk"];
            let response = choices[Math.floor(Math.random() * choices.length)];
    
            m.edit(`${response}: Bot Latency: \`${ping}\`, API Latency: \`${Math.round(bot.ping)}\``);
        });
    }
}