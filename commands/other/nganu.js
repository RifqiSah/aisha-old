module.exports = {
    name: 'nganu',
    desc: 'Nganu?',
    enable: true,
    regex: true,
    help: false,
    role: [],
    aliases: ['anu', 'eww'],
    usage: '',
    cooldown: 0,
    // eslint-disable-next-line no-unused-vars
    func: (client, message, args) => {
        message.channel.send('( ͡° ͜ʖ ͡°)');
    },
};
