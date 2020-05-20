const { inspect } = require('util');

module.exports = {
    name: 'eval',
    desc: 'Menjalankan scrip bash Linux!.',
    enable: true,
    regex: false,
    help: false,
    role: ['587649345327988736', '372915947478056960'],
    aliases: ['e', 'run', 'start'],
    usage: '[input]',
    cooldown: 0,
    // eslint-disable-next-line consistent-return
    func: async (client, message, args) => {
        if (message.author.id !== client.config.OWNER) return message.channel.send('Anda bukan pemilik hati aku!');

        const toEval = args.join(' ');
        // eslint-disable-next-line no-eval
        const evaluated = inspect(eval(toEval, { depth: 0 }));

        try {
            if (toEval) {
                const hrStart = process.hrtime();
                const hrDiff = process.hrtime(hrStart);

                return message.channel.send(`Executed in \`${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ''}${hrDiff[1] / 1000000}ms\`\n\`\`\`javascript\n${evaluated}\n\`\`\``, { maxLength: 1900 });
            }

            message.channel.send('ERROR: `Cannot evaluated air!`');
        } catch (e) {
            message.channel.send(`ERROR: \`${e.message}\``);
        }
    },
};
