let funct = require("../util/funct.js");

module.exports = {
    name: "iam",
    desc: "Memberikan role kepada Anda.",
    enable: true,
    regex: false,
    help: false,
    role: ['372929327903408150', '668439117264191498'],
    aliases: [],
	usage: '',
	cooldown: 0,
    func: (client, message, args) => {
        if (!args.length) return message.reply("Kamu tidak memasukan nama role!");

        let role = args.join(" ").toLowerCase();
        role = role.replace(/\b\w/g, l => l.toUpperCase())
        role = message.guild.roles.find(r => r.name === role);

        if (funct.getAllowedRoles(role.id)) {
            message.member.addRole(role.id);
            message.reply(`Anda berhasil mendapatkan role \`${role.name}\`!`);
        }
        else {
            message.reply(`Maaf, role \`${role.name}\` tidak dapat digunakan!`);
        }
    }
}