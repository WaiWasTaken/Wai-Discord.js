/** @format */

const Command = require("../Structures/Command.js");
const ee = require("../../embed.json");
const client = require("../Structures/Client");
const Discord = require("discord.js");

module.exports = new Command({
	name: "ping",
	description: "Shows the ping of the bot!",
	aliases: [],
	type: "TEXT",
	slashCommandOptions: [],
	permission: "SEND_MESSAGES",
	async run(message, args, cmd, client) {
		const ping = new Discord.MessageEmbed()
		.setColor(ee.color)
		.setTitle(`${client.ws.ping} ms`)
		.setFooter(ee.text)
		.setTimestamp()
		message.channel.send({ embeds: [ping] });
	}
});
