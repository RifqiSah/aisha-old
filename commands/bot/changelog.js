const Github = require('gh.js');

module.exports = {
    name: 'changelog',
    desc: 'Melihat _changelog_ atau perubahan yang terjadi pada Aisha.',
    enable: true,
    regex: false,
    help: true,
    role: [],
    aliases: ['log'],
    usage: '',
    cooldown: 0,
    // eslint-disable-next-line no-unused-vars
    func: async (client, message, args) => {
        const data = [];

        data.push(`__**Version ${client.config.VERSION} Changelog**__\n`);

        const gh = new Github('');
        // eslint-disable-next-line consistent-return
        await gh.get('repos/RifqiSah/Aisha/commits?per_page=10', (err, res) => {
            if (err) { return data.push(err); }

            data.push(res.map((c) => `\`[${c.committer.login}] ${c.commit.committer.date}\`: ${c.commit.message}`).join('\n'));
        });

        message.channel.send(data, { split: true });
    },
};
