const Event = require("../Structures/Event.js");
const ee = require("../../embed.json");
const Discord = require("discord.js");

module.exports = new Event("guildMemberRemove", (client, member) => {
	const channel = member.guild.channels.cache.find(
		c => c.name == "welcome"
	);

	if (!channel) return;

	const embed = new Discord.MessageEmbed();

	embed
		.setTitle("Member Left")
		.setColor(ee.color)
		.setAuthor(member.user.tag)
		.setFooter(ee.text)
		.addField("User Joined", member.joinedAt.toUTCString())
		.setTimestamp();

	channel.send({ embeds: [embed] });
});
