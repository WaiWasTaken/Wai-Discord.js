/** @format */

const Command = require("../Structures/Command.js");
const ee = require("../../embed.json");
const { MessageEmbed } = require("discord.js");
const Client = require("../Structures/Client");
const config = require("../../config.json");
const Discord = require("discord.js")



module.exports = new Command({
	name: "test",
	description: "Start playing from the queue",
	aliases: ['test'],
	type: "TEXT",
	slashCommandOptions: [],
	permission: "SEND_MESSAGES",
	async run(message, args, cmd, client) {
		const nope = new Discord.MessageEmbed()
			.setColor(ee.color)
			.setTitle(`That command can only be run by owner of this bot`)
			.setFooter(ee.text)
			.setTimestamp()
		if (message.author.id !== config.ownerID) return message.reply({ embeds: [nope] });
		client.guilds.cache.forEach(guild => {
			//console.table(`${guild.name} | ${guild.memberCount}`);
			console.table([{ name: "Guild's name", value: guild.name }, { name: "Member count", value: guild.memberCount }, { name: "Guild's ID", value: guild.id }]);
		})
		// First use guild.members.fetch to make sure all members are cached
	}
});
