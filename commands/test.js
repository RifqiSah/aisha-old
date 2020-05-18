module.exports = {
    name: 'test',
    desc: 'Menguji coba fitur baru pada Aisha.',
    enable: true,
    regex: false,
    help: false,
    role: ['433870492378595329'],
    aliases: [],
    usage: '',
    cooldown: 0,
    // eslint-disable-next-line no-unused-vars
    func: async (client, message, args) => {
        message.channel.send('Dalam perbaikan! Tidak ada fitur baru!');
    },
};
