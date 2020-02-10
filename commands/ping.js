module.exports = {
    name: "ping",
    desc: "Mendapatkan latency API dan latency BOT kepada server Discord.",
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
            let choices = ["Ini adalah latency aku", "Apakah baik-baik saja? Aku tidak dapat melihat!", "Aku berharap ini tidak buruk!"];
            let response = choices[Math.floor(Math.random() * choices.length)];
    
            m.edit(`${response}\nBot Latency: \`${ping}\`, API Latency: \`${Math.round(client.bot.ping)}\``);
        });
    }
}