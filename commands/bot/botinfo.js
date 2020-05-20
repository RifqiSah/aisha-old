module.exports = {
    name: 'botinfo',
    desc: 'Mendapatkan informasi dari Aisha.',
    enable: true,
    regex: false,
    help: true,
    role: [],
    aliases: [],
    usage: '',
    cooldown: 0,
    // eslint-disable-next-line no-unused-vars
    func: (client, message, args) => {
        const data = [];

        data.push('Halo, ini beberapa informasi dari Aisha:\n');
        data.push(`\`Serving\`: ${message.guild.name} Server`);
        data.push('`Host`: Heroku Free Plan');
        data.push(`\`Bot Owner\`: <@${client.config.OWNER}>`);
        data.push('\nSemoga harimu menyenangkan 😃. Terima kasih ~');

        message.channel.send(data, { split: true });
    },
};
