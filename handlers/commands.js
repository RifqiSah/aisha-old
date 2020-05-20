/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const { readdirSync } = require('fs');

module.exports = (client) => {
    console.log('  [-] Initialize commands');
    const load = (dirs) => {
        const commands = readdirSync(`./commands/${dirs}/`).filter((f) => f.endsWith('.js'));
        // eslint-disable-next-line no-restricted-syntax
        for (const file of commands) {
            const cmdfile = require(`../commands/${dirs}/${file}`);
            const key = file.slice(0, -3);

            console.log(`    + '${key}' added.`);

            client.cmds.set(key, cmdfile);
            cmdfile.aliases.forEach((alias) => {
                client.cmdsalias.set(alias, key);
            });

            if (cmdfile.regex) {
                client.cmdsregex.set(key, `\\${cmdfile.name}\\`);
                cmdfile.aliases.forEach((alias) => {
                    client.cmdsregex.set(alias, `\\${key}\\`);
                });
            }
        }
    };

    ['bot', 'discord', 'dragonnest', 'other'].forEach((x) => load(x));
    client.regexList = new RegExp(client.cmdsregex.map((key, item) => item).join('|'));
    console.log('  [V] Done!');
};
