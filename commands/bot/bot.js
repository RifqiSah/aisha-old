module.exports = {
    name: 'bot',
    desc: 'Control panel untuk BOT.\nPengaturan yang tersedia yaitu: ```- dch (Disable channel)\n- ech (Enable channel)```',
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

        if (!args.length) return message.channel.send('Harap masukkan parameter!').then((msg) => { msg.delete({ timeout: 5000 }); });
        switch (args[0]) {
        case 'dch':
            client.chsvc.addChannel(chid);
            data.push(`Channel <#${chid}> telah dimatikan!`);
            break;

        case 'ech':
            client.chsvc.deleteChannel(chid);
            data.push(`Channel <#${chid}> telah diaktifkan`);
            break;

        default:
            data.push(`Pengaturan untuk \`${args[0]}\` tidak ditemukan!`);
        }

        // eslint-disable-next-line max-len
        message.channel.send(data, { split: true }).then((msg) => { msg.delete({ timeout: 5000 }); });
    },
};
