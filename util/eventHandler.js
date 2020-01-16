const reqEvent = (event) => require(`../events/${event}`);

module.exports = (bot, config) => {
    bot.on("ready", () => reqEvent("ready")(bot, config));
    bot.on("guildMemberAdd", (member) => reqEvent("guildMemberAdd")(member));
    bot.on("guildMemberRemove", (member) => reqEvent("guildMemberRemove")(member));

    bot.on("warn", reqEvent("warn")(bot, config));
    bot.on("error", reqEvent("error")(bot, config));
}