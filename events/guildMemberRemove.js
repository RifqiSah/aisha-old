module.exports = (member) => {
    let channel = member.guild.channels.find(ch => ch.id === '337424516362010625'); // Out-Off Topic
    if (!channel)
        return;

    channel.send(`Oh tidakk, ${member} telah keluar dari server kita 😔`);

    member.guild.channels.find(ch => ch.name === 'member-log').send({
        embed: {
            color: 8311585,
            timestamp: new Date(),
            footer: {
                text: "User Left"
            },
            author: {
                name: member.user.tag + " (" + member.user.id + ")",
                icon_url: member.user.avatarURL
            }
        }
    });
}