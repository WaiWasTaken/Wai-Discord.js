/** @format */

const Command = require("../Structures/Command.js");
const ee = require("../../embed.json");
const { MessageEmbed } = require("discord.js");
const Client = require("../Structures/Client");



module.exports = new Command({
	name: "skip",
	description: "Skip command",
	aliases: ['next','n'],
	type: "Text",
	slashCommandOptions: [],
	permission: "CONNECT",
	async run(message, args, cmd, client) {
		const distube = require("distube")
		const music = args.join(" ")
		const no = new MessageEmbed();
		no
			.setColor(ee.color)
			.setAuthor("Please join a voice channel")
			.setTimestamp()
			.setFooter(ee.text)
		if (!message.member.voice.channel) return message.channel.send({ embeds: [no] });
		const queue = await client.distube.getQueue(message)
		const notInSameVC = new MessageEmbed();
		notInSameVC
			.setColor(ee.color)
			.setAuthor('You are not on the same voice channel as me')
			.setColor(ee.color)
			.setTimestamp()
			.setFooter(ee.text);

		if (queue) {
			if (message.member.guild.me.voice.channelId !== message.member.voice.channelId) {
				return message.reply({ embeds: [notInSameVC] })
			}
		}
		if (!queue) return;
		if (!queue.autoplay && queue.songs.length <= 1) return queue.toggleAutoplay();
        const next = new MessageEmbed()
        .setColor(ee.color)
        .setAuthor("Skipped current song")
        .setFooter(ee.text)
        .setTimestamp()
		

		try {
			client.distube.skip(message);
            message.channel.send({ embeds: [next] })
		  } catch (err) {
			console.log(err.message);
		  }
	}
});
