module.exports = {
    name: 'invite',
    desc: 'Berisi mengenai link invite server Informate.',
    enable: true,
    regex: true,
    help: false,
    role: [],
    aliases: ['inv', 'invt', 'invit'],
    usage: '',
    cooldown: 0,
    // eslint-disable-next-line no-unused-vars
    func: (client, message, args) => {
        message.channel.send('Link invite server dapat dilihat pada <#498123556413243412>');
    },
};
