module.exports = (bot, config) => {
    const activities_list = [
        "NULL",
        config.PREFIX + "help for command.",
        config.VERSION + " is running.",
        "Informate's BOT."
    ];

    // bot.user.setUsername("Aisha");
    console.log(`[] Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);
    if (!config.MT) {
        setInterval(() => {
            const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
            bot.user.setActivity(activities_list[index]);
        }, 10000);
    }
    else {
        bot.user.setActivity("BOT is maintenance until " + config.MT_TIME);
    }
}