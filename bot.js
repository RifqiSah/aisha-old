const Discord = require('discord.js');
const request = require("request");

var status = 0;
var DN_version = {"Local": 0, "Indonesia": 0, "Southeast Asia": 0, "Korea":0, "North America":0, "China":0};

var bot = new Discord.Client();
bot.on("ready", function() {
    console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);
    bot.user.setActivity('Informate Guild');
});

function checkVersion(msg, key, patch_url) {
	request({
		url: patch_url,
		json: false
	}, function (error, response, body)
	{
		if (!error && response.statusCode === 200) {
			var data 		= body.split(" ");
			var old_ver 	= DN_version[key];
			var new_ver 	= parseInt(data[1]);
      
      console.log("Checking " + key + " version.");
      
			if (old_ver < new_ver) {
				DN_version[key] = new_ver;

				msg.channel.send({embed: {
					color: 3447003,
					title: "Dragon Nest",
					description: "**" + key + "** telah update dari " + old_ver + " ke " + new_ver,
					timestamp: new Date()
				}});
			}
		}
	});
}

bot.on("message", function(message) {
  if (message.author.equals(bot.user)) return;

  if (message.content.toLowerCase() === "ping") {
    	message.channel.send("Pong! Latency: " + parseInt(bot.ping) + "ms");
    }
});

bot.login(process.env.TOKEN);
