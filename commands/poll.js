module.exports = {
    name: "poll",
    desc: "Membuat polling pada sebuah channel.",
    enable: true,
    regex: false,
    help: true,
    role: [],
    aliases: ['saran'],
	usage: '[pesan]',
	cooldown: 0,
    func: async (client, message, args) => {
        let msg = args.join(" ");

        let pol = await message.channel.send(`Polling dibuka oleh \`${message.author.tag}\`.\`\`\`${msg}\`\`\``);
        await pol.react("✅");
        await pol.react("❌");

        message.delete();
    }
}