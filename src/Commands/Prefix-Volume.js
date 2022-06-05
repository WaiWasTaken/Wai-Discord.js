/** @format */

const Command = require("../Structures/Command.js");
const ee = require("../../embed.json");
const { MessageEmbed, Message } = require("discord.js");
const Client = require("../Structures/Client");



module.exports = new Command({
	name: "volume",
	description: "volume",
	aliases: ['v'],
	type: "Text",
	slashCommandOptions: [],
	permission: "CONNECT",
	async run(message, args, cmd, client) {
		const distube = require("distube")
		const music = args.join(" ")
		const no = new MessageEmbed();
        const volume = parseInt(args[0])
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
        const q1 = new MessageEmbed()
        .setColor(ee.color)
        .setAuthor('There is nothing in the queue right now')
        .setFooter(ee.text)
        .setTimestamp()

        if (!queue) return message.channel.send({ embeds: [q1] });

        const mini = new MessageEmbed()
        .setColor(ee.color)
        .setAuthor("You can't set volume more than 100")
        .setFooter(ee.text)
        .setTimestamp()

        const max = new MessageEmbed()
        .setColor(ee.color)
        .setAuthor('You have to set music at least to 1')
        .setFooter(ee.text)
        .setTimestamp()

        const wrong  = new MessageEmbed()
        .setColor(ee.color)
        .setAuthor('Please enter a valid number')
        .setTimestamp()
        .setFooter(ee.text)

        if(args[0] > 100) return message.channel.send({ embeds: [mini] });
        if(args[0] < 1) return message.channel.send({ embeds: [max] });
        if (isNaN(volume)) return message.channel.send({ embeds: [wrong] });
        const s1 = new MessageEmbed()
        .setColor(ee.color)
        .setAuthor(`Volume set to ${volume}`)
        .setTimestamp()
        .setFooter(ee.text)


		try {
			client.distube.setVolume(message, volume);
            message.channel.send({ embeds: [s1] });
		  } catch (err) {
			console.log(err.message);
		  }
	}
});
