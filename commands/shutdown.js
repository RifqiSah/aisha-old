module.exports = {
    name: "shutdown",
    desc: "Matikan bot!.",
    enable: true,
    regex: false,
    help: true,
    role: ['587649345327988736', '372915947478056960'],
    aliases: ['turnoff', 'botkill', 'botstop'],
	usage: '',
	cooldown: 0,
    func: async (client, message, args) => {
        if (message.author.id != "306616861456465924") return message.channel.send("Anda bukan pemilik hati aku!");
        try {
            await message.channel.send("Aisha pergi dulu ya! Bye bye ~");
            process.exit();
        } catch(e) {
            message.channel.send(`ERROR: ${e.message}`);
        }
    }
}