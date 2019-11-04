module.exports = ping;

module.exports = {
    help: "Send a Pong!",
    func: (message, args) => {
        message.channel.sendMessage('Pong from module!');
    }
}