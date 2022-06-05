/** @format */

const Command = require("../Structures/Command.js");
const ee = require("../../embed.json");
const { MessageEmbed } = require("discord.js");
const Client = require("../Structures/Client");

module.exports = new Command({
	name: "play",
	description: "Start playing from the queue",
	aliases: ['p'],
	type: "TEXT",
	slashCommandOptions: [],
	permission: "CONNECT",
	async run(message, args, cmd, client) {

		// console.log("Prefix_Play");
		const isText = args[0].toLowerCase() === "play"
		if (isText) return console.log("Slash command is trying to be used as text command")

		const { distube } = require("distube")
		const music = args.join(" ")
		const pl = new MessageEmbed();
		const no = new MessageEmbed();
		//console.log(music)
		pl
			.setColor(ee.color)
			.setAuthor('Please enter a song url or name to search')
			.setColor(ee.color)
			.setTimestamp()
			.setFooter(ee.text);
		if (!music) return message.reply({ embeds: [pl] });
		no
			.setColor(ee.color)
			.setAuthor("Please join a voice channel")
			.setTimestamp()
			.setFooter(ee.text)
		if (!message.member.voice.channel) return message.reply({ embeds: [no], ehperal: true });
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


		try {
			client.distube.play(message.member.voice.channel, music, {
				member: message.member,
				textChannel: message.channel
			})
		} catch (err) {
			console.log(err.message);
		}
	}
});
