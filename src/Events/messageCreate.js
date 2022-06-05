/** @format */

const { DiscordAPIError } = require("discord.js");
const Event = require("../Structures/Event.js");
const ee = require('../../embed.json');
const Discord = require('discord.js');

module.exports = new Event("messageCreate", (client, message) => {
	if (message.author.bot || message.channel.type == 'DM') return;

	if (!message.content.startsWith(client.prefix)) return;

	const args = message.content.substring(client.prefix.length).split(/ +/);
	const cmd = args.shift().toLowerCase();
	const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

	if (!command) return;

	const { MessageEmbed } = require("discord.js");
	var blacklistarray = ["", /* "", "", "" */];// ID or ID(s) of user you wish to blacklist here
	const embed = new Discord.MessageEmbed();
	embed
		.setColor(ee.color)
		.setTimestamp()
		.setAuthor('You are blacklisted in the database by the owner from using this bot L')
		.setFooter(ee.text)
	if (blacklistarray.includes(message.author.id)) return message.channel.send({ embeds: [embed] });
	
	if (!["BOTH", "TEXT"].includes(command.type)) return message.reply("That command is only available via slash command!");

	const permission = message.member.permissions.has(command.permission, true);

	if (!permission)
		return message.reply(
			`You do not have the permission \`${command.permission}\` to run this command!`
		);
		
	command.run(message, args, cmd, client);
});
