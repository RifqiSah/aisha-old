module.exports = (bot, config) => {
    bot.user.setUsername('Aisha');
    // bot.user.setAvatar("");

    console.log(`[V] Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);

    const activitiesList = [
        `${config.PREFIX}h for command.`,
        `${config.VERSION} is running.`,
        "Informate's Bot.",
        `Serving ${bot.users.size} users in ${bot.guilds.size} guild.`,
    ];

    setInterval(() => {
        // bot.user.setStatus('dnd');
        // eslint-disable-next-line max-len
        bot.user.setActivity(activitiesList[Math.floor(Math.random() * activitiesList.length)]/* , { type: "WATCHING" } */);
    }, 10000);

    // Untuk ad-role select
    bot.channels.get('668661382228475915').fetchMessage('668673903014707220');
};
