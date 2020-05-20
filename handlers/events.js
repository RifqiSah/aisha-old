/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const { readdirSync } = require('fs');

module.exports = (client) => {
    console.log('  [-] Initialize events');
    const load = () => {
        const events = readdirSync('./events/').filter((f) => f.endsWith('.js'));
        // eslint-disable-next-line no-restricted-syntax
        for (const file of events) {
            const evt = require(`../events/${file}`);
            const ename = file.split('.')[0];

            console.log(`    + '${ename}' added.`);

            client.bot.on(ename, evt.bind(null, client));
        }
    };

    load();
    console.log('  [V] Done!');
};
