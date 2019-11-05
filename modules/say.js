module.exports = {
    desc: "Biarkan Aisha berbicara.",
    enabled: true,
    func: (client, message, args) => {
        if (message.member.roles.find(role => role.name === "Developer")) {
            const channel = message.mentions.channels.first();
            if (!channel) {
                message.channel.send("Mohon masukkan channel!");
                return;
            }
            
            args.shift();
            let sayMessage = args.join(" ");
                            
            message.delete().catch(O_o=>{});
            channel.send(sayMessage);
        }
        else {
            message.delete().catch(O_o=>{});
            message.channel.send("Maaf, Anda tidak mempunya akses untuk menggunakan command ini!").then(msg => {msg.delete(5000)}).catch();
        }
    }
}