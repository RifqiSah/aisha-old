module.exports = {
    desc: "Daftar command yang dapat digunakan pada Aisha.",
    enable: true,
    role: [],
    func: (client, message, args) => {
        const embed = client.discord_embed
            .setColor('#0099ff')
            .setTitle('Aisha BOT command')
            .setDescription(`Command yang tersedia pada Aisha. Gunakan prefix '${client.config.PREFIX}' di awal command agar dapat bekerja.`)
            .addBlankField();

        for(var cmds in client.commands)
            embed.addField(cmds, client.commands[cmds].desc);
        
        embed.addBlankField();
        embed.setFooter("Coded by: Muhammad Rifqi")
        
        message.channel.send(embed);
    }
}