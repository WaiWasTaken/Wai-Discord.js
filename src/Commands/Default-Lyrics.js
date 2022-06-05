/** @format */

const lyrics = require('lyrics-finder'); // npm i lyrics-finder
const yt = require('yt-search'); // npm i yt-search
const Command = require("../Structures/Command.js");
const ee = require("../../embed.json");
const { MessageEmbed } = require("discord.js");
const Client = require("../Structures/Client");
const Discord = require("discord.js")



module.exports = new Command({
    name: "Lyrics",
    description: "searches for lyrics on google",
    aliases: [],
    type: "SLASH",
    slashCommandOptions: [{
        name: "name",
        description: "the song you want to search for",
        type: 'STRING',
        required: true
    }],
    permission: "CONNECT",
    async run(interaction, args, client) {
        let query = args.join(" ").replace(this.name.toLowerCase(), " ");

        let embed = new Discord.MessageEmbed().setColor(ee.color).setFooter(`${ee.text}`, client.user.displayAvatarURL());
        let lyric = await lyrics(query); // Searching for the lyrics on Google
        let noLyric = 0 // Indicates if the lyrics exist or not

        if (!lyric) {
            lyric = `No Lyrics found for ${query}`; // Handles no lyrics
            noLyric++ // Increments noLyric to indicate theres no lyrics
        }

        embed.setDescription(lyric.length >= 4093 ? lyric.substring(0, 4093) + '...' : lyric); // Adds the lyrics to the embed
        let searchEmbed = new Discord.MessageEmbed().setColor(ee.color).setTitle("searching for lyrics...").setTimestamp().setFooter(ee.text);
        interaction.reply({ embeds: [searchEmbed], ephemeral: true });
        if (noLyric == 0) {
            let res = await yt.search(query); // Searches the song name on youtube
            let song = res.videos[0]; // Chooses the first result
            if (song) embed.setTitle(song.title).setURL(song.url).setThumbnail(song.image) // Adds the youtube video data to the embed
        }

        interaction.editReply({ embeds: [embed]}) // Sends the embed
    }
});
