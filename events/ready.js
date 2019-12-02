module.exports = (bot, config) => {
    // bot.user.setUsername("Aisha");
    console.log(`[] Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);

    const activities_list = [
        "NULL",
        config.PREFIX + "help for command.",
        config.VERSION + " is running.",
        "Informate's BOT.",
        `Serving ${bot.users.size} users in ${bot.guilds.size} guilds.`
    ];

    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
        bot.user.setActivity(activities_list[index]);
    }, 5000);
}