module.exports = {
    name: 'pewpew',
    desc: 'Pewpew?',
    enable: true,
    regex: true,
    help: false,
    role: [],
    aliases: ['pew'],
    usage: '',
    cooldown: 0,
    // eslint-disable-next-line no-unused-vars
    func: (client, message, args) => {
        message.channel.send('╰( ͡° ͜ʖ ͡° )つ──☆*:・ﾟ pew pew magic');
    },
};
