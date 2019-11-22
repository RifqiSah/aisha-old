module.exports = {
    desc: "Menjalankan ulang BOT dari server.",
    enable: true,
    role: ['433870492378595329'],
    func: (client, message, args) => {
        message.channel.send('Menjalankan ulang BOT ....')
        .then(msg => client.bot.destroy())
        .then(() => client.bot.login(client.config.TOKEN));
    }
}