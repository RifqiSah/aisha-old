module.exports = {
    desc: "Mengirim pesan \"Penting\" kepada para Organizer.\nCommand ini digunakan jika ada pesan \"penting\" yang ingin segera disampaikan!.",
    enabled: true,
    func: (cmd, message, args) => {
        message.delete();

        var Organizer    = message.guild.roles.find(role => role.name === 'Developer').members.array();
        for(var mOrganizer in Organizer) {
            Organizer[mOrganizer].user.send("Anda mendapatkan pesan penting dari " + message.author.username + ":", {
                embed: {
                    color: 3447003,
                    description: args.join(" "),
                    footer: {
                        icon_url: message.author.avatarURL,
                        text: message.author.tag
                    }
                }
            }).catch(() => {});
        }

        message.reply("Sukses mengirim pesan kepada para Organizer!");
    }
}