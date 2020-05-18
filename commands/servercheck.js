const net = require('net');
const funct = require('../util/funct.js');

module.exports = {
    name: 'servercheck',
    desc: 'Melihat status server Dragon Nest.',
    enable: true,
    regex: false,
    help: false,
    role: ['433870492378595329'],
    aliases: ['sc'],
    usage: '[server ID]',
    cooldown: 0,
    func: async (client, message, args) => {
        message.delete();

        const ret = [];
        const dns = funct.getServerIP(args[0].toUpperCase());
        const msgs = await message.channel.send(`Menghubungkan ke \`${dns.ip} (${dns.name})\` ...`);

        // Start server check
        const socket = new net.Socket();
        socket.setTimeout(5000);

        socket.connect(dns.port, dns.ip, () => {
            ret.push(`Connected to ${dns.name} server!`);
        });

        socket.on('data', (data) => {
            ret.push(`Received: ${data}`);
            ret.push(`${dns.name} server is UP!`);

            socket.destroy();
        });

        // eslint-disable-next-line no-unused-vars
        socket.on('error', (err) => {
            ret.push(`${dns.name} server is DOWN!`);
        });

        socket.on('timeout', () => {
            ret.push(`${dns.name} server is TIMEOUT!`);
            socket.destroy();
        });

        socket.on('close', () => {
            ret.push('Closed!');
            msgs.edit(ret).then((msg) => { msg.delete(10000); });
        });
    },
};
