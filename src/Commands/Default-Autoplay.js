/** @format */

const Command = require("../Structures/Command.js");
const ee = require("../../embed.json");
const { MessageEmbed } = require("discord.js");
const Client = require("../Structures/Client");
const Discord = require("discord.js")



module.exports = new Command({
    name: "Autoplay",
    description: "Enable or disable autoplay",
    aliases: [],
    type: "SLASH",
    slashCommandOptions: [],
    permission: "CONNECT",
    async run(interaction, args, client) {
        const queue = await client.distube.getQueue(interaction)
        const NotInVC = new MessageEmbed();
        const notInSameVC = new MessageEmbed();

        const { distube } = require("distube")
        const voiceChannel = interaction.member.voice.channel

        notInSameVC
            .setColor(ee.color)
            .setAuthor('You are not on the same voice channel as me')
            .setColor(ee.color)
            .setTimestamp()
            .setFooter(ee.text);
        NotInVC
            .setColor(ee.color)
            .setAuthor("Please join a voice channel")
            .setTimestamp()
            .setFooter(ee.text)

        if (!voiceChannel) {
            return interaction.reply({ embeds: [NotInVC], ephemeral: true })
        }
        if (queue) {
            if (interaction.member.guild.me.voice.channelId !== interaction.member.voice.channelId) {
                return interaction.reply({ embeds: [notInSameVC], ephemeral: true })
            }
        }
        if (!interaction.guild.me.voice.channel) {
			const embed = new MessageEmbed();

			embed
				.setColor(ee.color)
				.setTimestamp()
				.setAuthor('I am not in a voice channel') 
				.setFooter({text: ee.text})

			interaction.reply({ embeds: [embed], ephemeral: true });

			return;
        }
        const empty = new MessageEmbed()
        empty
		.setColor(ee.color)
		.setAuthor("There is nothing in the queue right now")
		.setFooter(ee.text)
		.setTimestamp()

        if (!queue) return interaction.reply({ embeds: [empty], ephemeral: true });

        const autoplay = queue.toggleAutoplay()
        const at = new MessageEmbed()
        at
        .setColor(ee.color)
		.setAuthor(` AutoPlay is ${autoplay ? "on" : "Off"}`)
		.setFooter(ee.text)
		.setTimestamp()
        interaction.reply({ embeds: [at]});
    }
});
