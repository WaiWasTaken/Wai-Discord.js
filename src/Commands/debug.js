/** @format */
const Command = require("../Structures/Command.js");
const ee = require("../../embed.json");
const client = require("../Structures/Client");
const Discord = require("discord.js");
const config = require("../../config.json");


module.exports = new Command({
	name: "debug",
	description: "Owner only",
	aliases: [],
	type: "Text",
	slashCommandOptions: [],
	permission: "SEND_MESSAGES",
	async run(message, args, cmd, client) {


		let totalSeconds = (client.uptime / 1000);
		let days = Math.floor(totalSeconds / 86400);
		totalSeconds %= 86400;
		let hours = Math.floor(totalSeconds / 3600);
		totalSeconds %= 3600;
		let minutes = Math.floor(totalSeconds / 60);
		let seconds = Math.floor(totalSeconds % 60);
		let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;


		// only show days if it is more than 1 day
		uptime = `Uptime: ${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`
		
		if (days <= 0) {
			uptime = `Uptime: ${hours} hours, ${minutes} minutes and ${seconds} seconds`
		}
		if (hours <= 0) {
			uptime = `Uptime: ${minutes} minutes and ${seconds} seconds`
		}
		if (minutes <= 0) {
			uptime = `Uptime:  ${seconds} seconds`
		}

		// let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;


		const IDs = require("../id");
		let waitID = IDs.waitID;
		let leaveID = IDs.leaveID;
		let skipID = IDs.skipID;

		const nope = new Discord.MessageEmbed()
			.setColor(ee.color)
			.setTitle(`That command can only be run by owner of this bot`)
			.setFooter(ee.text)
			.setTimestamp()
		if (message.author.id !== config.ownerID) return message.reply({ embeds: [nope] });
		const debug = new Discord.MessageEmbed()
			.setColor(ee.color)
			.setAuthor(`${uptime}`)
			.setTitle(`Currently in ${client.guilds.cache.size} servers and in ${client.voice.adapters.size} voice channels`)
			.setThumbnail('https://i.imgur.com/pw7Ptl1.png')
			.setDescription(`WaitID is **${waitID}**\nLeaveID is **${leaveID}**\nSkipID is **${skipID}**`)
			.setFooter({ text: ee.text, iconURL: message.author.avatarURL() });
		message.channel.send({ embeds: [debug] });
	}
});
