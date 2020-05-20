module.exports = {
    name: 'uptime',
    desc: 'Melihat berapa lama bot sudah berjalan.',
    enable: true,
    regex: false,
    help: true,
    role: ['433870492378595329'],
    aliases: ['up'],
    usage: '',
    cooldown: 0,
    // eslint-disable-next-line no-unused-vars
    func: (client, message, args) => {
        function duration(ms) {
            const sec = Math.floor((ms / 1000) % 60).toString();
            const min = Math.floor((ms / (1000 * 60)) % 60).toString();
            const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString();
            const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString();

            return `\`${days.padStart(1, '0')}\` hari, \`${hrs.padStart(2, '0')}\` jam, \`${min.padStart(2, '0')}\` menit, \`${sec.padStart(2, '0')}\` detik.`;
        }

        message.channel.send(`Aku sudah online selama ${duration(client.bot.uptime)}`);
    },
};
