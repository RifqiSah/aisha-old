let funct = require("../util/funct.js");

module.exports = (member) => {
    let channel = member.guild.channels.find(ch => ch.id === '337424516362010625'); // Out-Off Topic
    if (!channel)
        return;

    channel.send(`Oh tidakk, ${member} telah keluar dari server kita 😔`);

    // Logs
    let data = [];

    data.push("__**User Left**__\n");
    data.push(`User ID: ${member.user.id}`);
    data.push(`Nickname: ${member.user.tag}`);
    data.push(`Avatar URL: ${member.user.avatarURL}\n`);
    data.push(`- ${funct.getDate()}`);

    member.guild.channels.find(ch => ch.name === 'member-log').send(data, { split: true });
}