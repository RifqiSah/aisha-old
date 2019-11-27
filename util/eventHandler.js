const reqEvent = (event) => require(`../events/${event}`);

module.exports = (bot, config) => {
    bot.on("ready", () => reqEvent("ready")(bot, config));
}