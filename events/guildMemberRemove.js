const funct = require('../util/funct.js');

module.exports = (member) => {
    const channel = member.guild.channels.find((ch) => ch.id === '337424516362010625'); // Out-Off Topic
    if (!channel) return;

    channel.send(`Oh tidakk, ${member} telah keluar dari server kita 😔`);

    // Logs
    const data = [];

    data.push('__**User Left**__\n');

    data.push(`${funct.getDate()}`);
    data.push(`\`${member.user.id}\` ${member.user.tag}`);
    data.push(`<${member.user.avatarURL}>`);

    member.guild.channels.find((ch) => ch.id === '496220491988729856').send(data, { split: true }); // member-log-1
};
