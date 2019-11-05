module.exports = {
    desc: "Biarkan Aisha berbicara.",
    enable: true,
    role: ['433870492378595329'],
    func: (client, message, args) => {
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
}