const Discord = require('discord.js');
const request = require("request");

var prefix = "+";
var status = 0;
var DN_version = {"Local": 0, "Indonesia": 0, "Southeast Asia": 0, "North America":0, "Korea":0, "China":0, "Taiwan":0};

var bot = new Discord.Client();
bot.on("ready", function() {
    console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);
    bot.user.setActivity(process.env.GAME);
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
	if (message.content.indexOf(prefix) !== 0) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if (command === "ping") {
		message.channel.send("Pong! Latency: " + parseInt(bot.ping) + "ms");
	}

	if (command === "dntrack") {
		message.delete();

		if (args[0] === "on") {
			if (status) {
				message.channel.send("**Dragon Nest** version tracking is already ON !");
				return;
			}
			else {
				message.channel.send("**Dragon Nest** version tracking is turned ON !");
				status = 1;
			}

			var loop = setInterval(function () {
				checkVersion(message, "Indonesia", "http://patch.gemscool.com/dragonnest/live/PatchInfoServer.cfg");
				checkVersion(message, "Southeast Asia", "http://patchsea.dragonnest.com/Game/DragonNest/Patch/PatchInfoServer.cfg");
				checkVersion(message, "North America", "http://patchus.dragonnest.com/Game/DragonNest/Patch/PatchInfoServer.cfg");
				checkVersion(message, "Korea", "http://res.dn.pupugame.com/Patch/PatchInfoServer.cfg");
				checkVersion(message, "China", "http://dorado.sdo.com/dn/patchinfo/Public/PatchInfoServer.cfg");
				checkVersion(message, "Taiwan", "http://dnpatch.gameflier.com/PatchInfoServer.cfg");

				if (status == 0) {
					console.log('Exiting ...');
					clearInterval(loop);
				}
			}, 1000);
		}
		else if (args[0] === "off") {
			if (!status) {
				message.channel.send("**Dragon Nest** version tracking is already OFF !");
			}
			else {
				message.channel.send("**Dragon Nest** version tracking is turned OFF !");
				status = 0;
			}
		}
	}
});

bot.login(process.env.TOKEN);
