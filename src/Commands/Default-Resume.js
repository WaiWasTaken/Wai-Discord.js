/** @format */

const Command = require("../Structures/Command.js");
const ee = require("../../embed.json");
const { MessageEmbed } = require("discord.js");
const Client = require("../Structures/Client");
const Discord = require("discord.js")



module.exports = new Command({
    name: "Resume",
    description: "Resumes the current song",
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
                .setFooter({ text: ee.text })

            interaction.reply({ embeds: [embed], ephemeral: true });

            return;
        }
        const pause = new MessageEmbed();
        pause
            .setColor(ee.color)
            .setAuthor("Paused the song for you")
            .setTimestamp()
            .setFooter(ee.text)
        const resume = new MessageEmbed();
        resume
            .setColor(ee.color)
            .setAuthor("Resumed the song for you")
            .setTimestamp()
            .setFooter(ee.text)

        const empty = new MessageEmbed();
        empty
            .setColor(ee.color)
            .setAuthor("There is nothing in the queue right now")
            .setFooter(ee.text)
            .setTimestamp()
        if (!queue) return interaction.reply({ embeds: [empty], ephemeral: true });
        // check is queue is paused
        if (!queue.paused) {
            // if paused, resume
            queue.pause();
            interaction.reply({ embeds: [pause] });
        } else {
            // if not paused, pause
            queue.resume();
            interaction.reply({ embeds: [resume] });
        }
    }
});
