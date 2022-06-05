/** @format */

const Command = require("../Structures/Command.js");
const ee = require("../../embed.json");
const { MessageEmbed } = require("discord.js");
const Client = require("../Structures/Client");
const config = require("../../config.json");
const Discord = require("discord.js")



module.exports = new Command({
	name: "resume",
	description: "Resume the current song",
	aliases: ['unpause'],
	type: "TEXT",
	slashCommandOptions: [],
	permission: "SEND_MESSAGES",
	async run(message, args, cmd, client) {
		const no = new MessageEmbed();
		no
			.setColor(ee.color)
			.setAuthor("Please join a voice channel")
			.setTimestamp()
			.setFooter(ee.text)
		const resume = new MessageEmbed();
			resume
				.setColor(ee.color)
				.setAuthor("Resumed the song for you")
				.setTimestamp()
				.setFooter(ee.text)
        const pause = new MessageEmbed();
			pause
				.setColor(ee.color)
				.setAuthor("Paused the song for you")
				.setTimestamp()
				.setFooter(ee.text)        
		if (!message.member.voice.channel) return message.reply({ embeds: [no] });
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
		const nice = new MessageEmbed();
		nice
		.setColor(ee.color)
		.setAuthor("There is nothing in the queue right now")
		.setFooter(ee.text)
		.setTimestamp()
		if (!queue) return message.channel.send({ embeds: [nice] });
        // check if the queue is resumed
        if (!queue.paused) {

            queue.pause();
            message.channel.send({ embeds: [pause] });
        } else {
            queue.resume();
            message.channel.send({ embeds: [resume] });
        }
	}
});
