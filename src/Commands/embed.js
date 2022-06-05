/** @format */

const Command = require("../Structures/Command.js");
const ee = require("../../embed.json");
const Discord = require("discord.js");
const v = require("../../package.json");
const config = require("../../config.json");

module.exports = new Command({
	name: "embed",
	description: "Shows an embed",
	aliases: [],
	type: "TEXT",
	slashCommandOptions: [],
	permission: "SEND_MESSAGES",
	async run(message, args, cmd, client) {
		const embed = new Discord.MessageEmbed();
		const user = message instanceof Discord.CommandInteraction ? message.user : message.author;

		embed
			.setColor(ee.color)
			.setTimestamp()
			.setAuthor('Hello there!', user.displayAvatarURL())
			.setFooter(ee.text)

		message.reply({ embeds: [embed], ephemeral: true });
	}
});
