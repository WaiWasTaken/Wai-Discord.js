/** @format */

const Command = require("../Structures/Command.js");
const ee = require("../../embed.json");
const { MessageEmbed } = require("discord.js");
const Client = require("../Structures/Client");



module.exports = new Command({
    name: "Play",
    description: "Plays a song with the given name or url",
    aliases: [],
    type: "SLASH",
    slashCommandOptions: [{
        name: "song",
        description: "Enter a song name or url",
        type: 'STRING',
        required: true
    }],
    permission: "CONNECT",
    async run(interaction, args, client) {
        const Search = new MessageEmbed();
        const done = new MessageEmbed();
        const NotInVC = new MessageEmbed();
        const notInSameVC = new MessageEmbed();
        let notSupported = new MessageEmbed().setAuthor("Sorry | this channel is not supported").setColor(ee.color).setFooter({ text: ee.text, iconURL: client.user.avatarURL() })

        // console.log("Slash_Play");
        const { distube } = require("distube")
        const voiceChannel = interaction.member.voice.channel
        if(interaction.channel.id == "912771998525050891") return interaction.reply({ embeds: [notSupported], ephemeral: true });
        const queue = await client.distube.getQueue(interaction)
        let query = args.join(" ").replace(this.name.toLowerCase(), " ");
       // console.log(query);
        if (query.includes("https://www.youtube.com/watch?v=")) {
            // removes evrthing from link except the video id
            let link = query.replace(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/, '$2');
           // console.log(link);
            query = `https://youtu.be/${link}`
        }

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
        Search
            .setColor(ee.color)
            .setAuthor('🔍 Searching and attempting...')
            .setColor(ee.color)
            .setTimestamp()
            .setFooter(ee.text);
        done
            .setColor(ee.color)
            .setAuthor("Searching done...")
            .setTimestamp()
            .setFooter(ee.text)

        await interaction.reply({ embeds: [Search], ephemeral: true })
        await interaction.editReply({ embeds: [done], ephemeral: true })

        client.distube.play(voiceChannel, query, {
            textChannel: interaction.channel,
            member: interaction.member
        })

    }
});

