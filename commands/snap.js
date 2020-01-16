module.exports = {
    name: "snap",
    desc: "Mengkosongkan pesan pada channel.",
    enable: true,
    regex: false,
    help: true,
    role: ['433870492378595329'],
    aliases: ['delete', 'prune', 'del', 'thanos'],
	usage: '[jumlah pesan]',
	cooldown: 0,
    func: async (client, message, args) => {
        message.delete();
        
        if (!args) return message.channel.send('Mohon masukkan jumlah pesan yang akan dihapus!').then(msg => {msg.delete(5000)}).catch();
        if (isNaN(args)) return message.channel.send('Jumlah pesan tidak valid!').then(msg => {msg.delete(5000)}).catch();

        if (args > 100) return message.channel.send('Maksimal pesan yang dihapus adalah 100!').then(msg => {msg.delete(5000)}).catch();
        if (args < 1) return message.channel.send('Minimal pesan yang dihapus adalah 1!').then(msg => {msg.delete(5000)}).catch();

        await message.channel.fetchMessages({ limit: args }).then(messages => {
            message.channel.bulkDelete(messages).catch(message.channel.send(console.error).then(msg => {msg.delete(5000)}));
        });

        message.channel.send(`${args} pesan telah dihapus!`).then(msg => {msg.delete(5000)}).catch();
    }
}