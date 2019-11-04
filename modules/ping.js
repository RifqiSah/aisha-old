module.exports = {
    desc: "Mendapatkan latency kepada API server Discord.",
    enabled: true,
    func: (cmd, message, args) => {
        message.channel.send('Pong from module!');
    }
}