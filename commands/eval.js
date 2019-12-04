const { inspect } = require("util");

module.exports = {
    name: "eval",
    desc: "Menjalankan scrip bash Linux!.",
    enable: true,
    regex: false,
    help: false,
    role: ['587649345327988736', '372915947478056960'],
    aliases: ['e', 'run', 'start'],
	usage: '[input]',
	cooldown: 0,
    func: async (client, message, args) => {
        if (message.author.id != client.config.OWNER) return message.channel.send("Anda bukan pemilik hati aku!");

        let toEval = args.join(" ");
        let evaluated = inspect(eval(toEval, { depth: 0 } ));

        try {
            if (toEval) {
                let hrStart = process.hrtime();
                let hrDiff;

                hrDiff = process.hrtime(hrStart)
                return message.channel.send(`Executed in \`${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ''}${hrDiff[1] / 1000000}ms\`\n\`\`\`javascript\n${evaluated}\n\`\`\``, { maxLength: 1900 });
            }
            else {
                message.channel.send("ERROR: `Cannot evaluated air!`");
            }
        }
        catch (e) {
            message.channel.send(`ERROR: \`${e.message}\``);
        }
    }
}