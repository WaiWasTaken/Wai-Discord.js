/** @format */

const Command = require("../Structures/Command.js");
const ee = require("../../embed.json");
const { MessageEmbed } = require("discord.js");
const Client = require("../Structures/Client");
const Discord = require("discord.js")



module.exports = new Command({
    name: "Volume",
    description: "Let's you change the bots output volume",
    aliases: [],
    type: "SLASH",
    slashCommandOptions: [{
        name: "input",
        description: "Enter a number from 1-100",
        type: 'NUMBER',
        required: true
    }],
    permission: "CONNECT",
    async run(interaction, args, client) {
        // console.log(args[1])
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
        const empty = new MessageEmbed();
        empty
            .setColor(ee.color)
            .setAuthor("There is nothing in the queue right now")
            .setFooter(ee.text)
            .setTimestamp()
        if (!queue) return interaction.reply({ embeds: [empty], ephemeral: true });


        const volume = parseInt(args[1])

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

        if (args[1] > 100) return interaction.reply({ embeds: [mini], ephemeral: true });
        if (args[1] < 1) return interaction.reply({ embeds: [max], ephemeral: true });
        const s1 = new MessageEmbed()
            .setColor(ee.color)
            .setAuthor(`Volume set to ${volume}`)
            .setTimestamp()
            .setFooter(ee.text)

           
        client.distube.setVolume(interaction, volume)
        interaction.reply({ embeds: [s1] });


    }
});
