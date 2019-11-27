module.exports = {
    name: "restart",
    desc: "Menjalankan ulang BOT dari server.",
    enable: true,
    regex: false,
    help: true,
    role: ['433870492378595329'],
    aliases: [],
	usage: '',
	cooldown: 0,
    func: (client, message, args) => {
        message.channel.send('Menjalankan ulang BOT ....')
        .then(msg => client.bot.destroy())
        .then(() => client.bot.login(client.config.TOKEN));
    }
}