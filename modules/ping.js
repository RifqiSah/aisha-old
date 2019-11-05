module.exports = {
    desc: "Mendapatkan latency kepada API server Discord.",
    enable: true,
    role: [],
    func: (client, message, args) => {
        message.channel.send('Pong! Latency is ' + parseInt(client.bot.ping) + 'ms.');
    }
}