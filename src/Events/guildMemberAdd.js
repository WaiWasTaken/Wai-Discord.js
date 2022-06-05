const Event = require("../Structures/Event.js");
const ee = require("../../embed.json");
const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = new Event("guildMemberAdd", (client, member) => {
	const channel = member.guild.channels.cache.find(
		c => c.name == "welcome"
	);
	if (!channel) return;

	const embed = new Discord.MessageEmbed();

	embed
		.setTitle("New Member")
		.setColor(ee.color)
		.setFooter(ee.text)
		.setAuthor(member.user.tag)
		.addFields(
			{
				name: "User Joined",
				value: member.joinedAt.toUTCString(),
				inline: true
			}
		)
		.setTimestamp(member.joinedTimestamp);

	channel.send({ embeds: [embed] });
});
