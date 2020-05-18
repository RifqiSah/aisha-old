/* eslint-disable consistent-return */
module.exports = {
    name: 'shutdown',
    desc: 'Matikan bot!.',
    enable: true,
    regex: false,
    help: false,
    role: ['587649345327988736', '372915947478056960'],
    aliases: ['turnoff', 'botkill', 'botstop'],
    usage: '',
    cooldown: 60,
    // eslint-disable-next-line no-unused-vars
    func: async (client, message, args) => {
        if (message.author.id !== client.config.OWNER) return message.channel.send('Anda bukan pemilik hati aku!');
        try {
            await message.channel.send('Aisha pergi dulu ya! Bye bye ~');
            process.exit();
        } catch (e) {
            message.channel.send(`ERROR: ${e.message}`);
        }
    },
};
