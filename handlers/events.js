/* eslint-disable global-require */
// eslint-disable-next-line import/no-dynamic-require
const reqEvent = (event) => require(`../events/${event}`);

module.exports = (client, bot, config) => {
    bot.on('ready', () => reqEvent('ready')(bot, config));

    bot.on('raw', (packet) => reqEvent('raw')(packet, bot));
    bot.on('guildMemberAdd', (member) => reqEvent('guildMemberAdd')(member));
    bot.on('guildMemberRemove', (member) => reqEvent('guildMemberRemove')(member));
    bot.on('messageReactionAdd', (reaction, user) => reqEvent('messageReactionAdd')(reaction, user));
    bot.on('messageReactionRemove', (reaction, user) => reqEvent('messageReactionRemove')(reaction, user));

    bot.on('message', (message) => reqEvent('message')(message, client));
};
