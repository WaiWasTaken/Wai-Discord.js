/*
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
        const autoplay = queue.toggleAutoplay()
        message.channel.send(`${client.emotes.success} | AutoPlay: \`${autoplay ? "On" : "Off"}\``)
*/
/** @format */

const Command = require("../Structures/Command.js");
const ee = require("../../embed.json");
const { MessageEmbed } = require("discord.js");
const Client = require("../Structures/Client");


module.exports = new Command({
	name: "autoplay",
	description: "autoplay",
	aliases: ['at'],
	type: "Text",
	slashCommandOptions: [],
	permission: "SEND_MESSAGES",
	async run(message, args, cmd, client) {
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
		const no = new MessageEmbed()
        no
        .setColor(ee.color)
        .setAuthor("Please join a voice channel")
        .setTimestamp()
        .setFooter(ee.text)
        if (!message.member.voice.channel) return message.channel.send({ embeds: [no] });
        const nice = new MessageEmbed()
        nice
		.setColor(ee.color)
		.setAuthor("There is nothing in the queue right now")
		.setFooter(ee.text)
		.setTimestamp()

        if (!queue) return message.channel.send({ embeds: [nice] });
        const autoplay = queue.toggleAutoplay()
        const at = new MessageEmbed()
        at
        .setColor(ee.color)
		.setAuthor(` AutoPlay is ${autoplay ? "on" : "Off"}`)
		.setFooter(ee.text)
		.setTimestamp()
        message.channel.send({ embeds: [at] });

	}
});