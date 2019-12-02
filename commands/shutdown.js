module.exports = {
    name: "shutdown",
    desc: "Matikan bot!.",
    enable: true,
    regex: false,
    help: false,
    role: ['372915947478056960'],
    aliases: ['turnoff', 'botkill', 'botstop'],
	usage: '',
	cooldown: 0,
    func: async (client, message, args) => {
        if (message.author.id != "306616861456465924") return message.channel.send("You're not the bot the owner!");
        try {
            await message.channel.send("Bot is shutting down ...");
            process.exit()
        } catch(e) {
            message.channel.send(`ERROR: ${e.message}`);
        }
    }
}