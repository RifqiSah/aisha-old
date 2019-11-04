const Discord = require('discord.js');
const { VERSION, TOKEN, PREFIX } = require('./../config');

module.exports = {
    desc: "Daftar command yang dapat digunakan pada Aisha.",
    enabled: true,
    func: (cmd, message, args) => {
        const embed = new Discord.RichEmbed()
            .setColor('#0099ff')
            .setTitle('Aisha BOT command')
            .setDescription(`Command yang tersedia pada Aisha. Gunakan prefix '${PREFIX}' di awal command agar dapat bekerja.`)
            .addBlankField();

        for(var cmds in cmd)
            embed.addField(cmds, cmd[cmds].desc);
        
        embed.addBlankField();
        embed.setFooter("Coded by: Muhammad Rifqi")
        
        message.channel.send(embed);
    }
}