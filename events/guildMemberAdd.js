let funct = require("../util/funct.js");

module.exports = (member) => {
    let channel = member.guild.channels.find(ch => ch.id === '337424516362010625'); // Out-Off Topic
    if (!channel)
        return;

    member.user.send("Terima kasih telah bergabung kedalam Discord milik Informate Squad 😃\nSilahkan membaca channel ``#peraturan`` terlebih dahulu sebelum memulai aktifitas didalam server Discord milik Informate Squad.\n\nTerima kasih 😃");
    channel.send(`Selamat datang di Informate Server, ${member}! Taati peraturan yang telah dibuat pada <#372926591849988096> demi kenyamanan kita bersama.\n\nTerima kasih 😃`); // #peraturan

    // Untuk command verify
    member.addRole("669544469594374145");

    // Logs
    let data = [];

    data.push("__**User Joined**__\n");
    data.push(`User ID: ${member.user.id}`);
    data.push(`Nickname: ${member.user.tag}`);
    data.push(`Avatar URL: <${member.user.avatarURL}>\n`);
    data.push(`${funct.getDate()}`);

    member.guild.channels.find(ch => ch.name === '496220491988729856').send(data, { split: true }); // member-log-1
}