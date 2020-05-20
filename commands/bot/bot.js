module.exports = {
    name: 'bot',
    desc: 'Control panel untuk BOT.',
    enable: true,
    regex: false,
    help: false,
    role: ['372915947478056960'],
    aliases: [],
    usage: '[sub command] [status]',
    cooldown: 0,
    // eslint-disable-next-line consistent-return
    func: (client, message, args) => {
        message.delete();

        const data = [];
        const chid = message.channel.id;

        if (!args.length) return message.channel.send('Wrong parameter!').then((msg) => { msg.delete(5000); });
        switch (args[0]) {
        case 'dch':
            client.chsvc.addChannel(chid);
            data.push(`Channel \`${chid}\` is disabled for Aisha!`);
            break;

        case 'ech':
            client.chsvc.deleteChannel(chid);
            data.push(`Channel \`${chid}\` is enabled for Aisha!`);
            break;

        default:
            data.push(`Bot command for \`${args[0]}\` not found!`);
        }

        message.channel.send(data, { split: true }).then((msg) => { msg.delete(5000); });
    },
};
