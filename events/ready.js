module.exports = (client) => {
    if (client.config.ENV === 'production') {
        client.bot.user.setUsername('Aisha');
    } else {
        client.bot.user.setUsername('Aisha [Test]');
        client.config.PREFIX = '%';
    }

    // bot.user.setAvatar("");

    console.log(`[V] Bot has started, with ${client.bot.users.size} users, in ${client.bot.channels.size} channels of ${client.bot.guilds.size} guilds.`);

    const activitiesList = [
        `${client.config.PREFIX}h for command.`,
        `${client.config.VERSION} is running.`,
        "Informate's Bot.",
        `Serving ${client.bot.users.size} users in ${client.bot.guilds.size} guild.`,
    ];

    setInterval(() => {
        // bot.user.setStatus('dnd');
        // eslint-disable-next-line max-len
        client.bot.user.setActivity(activitiesList[Math.floor(Math.random() * activitiesList.length)]/* , { type: "WATCHING" } */);
    }, 10000);

    // Untuk ad-role select
    client.bot.channels.get('668661382228475915').fetchMessage('668673903014707220');
};
