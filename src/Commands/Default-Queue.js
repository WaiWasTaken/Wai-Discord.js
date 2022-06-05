/** @format */

const Command = require("../Structures/Command.js");
const ee = require("../../embed.json");
const { MessageEmbed } = require("discord.js");
const Client = require("../Structures/Client");
const Discord = require("discord.js")



module.exports = new Command({
    name: "Queue",
    description: "Display the queue of this server",
    aliases: [],
    type: "SLASH",
    slashCommandOptions: [],
    permission: "CONNECT",
    async run(interaction, args, client) {
        const queue = await client.distube.getQueue(interaction)
        const { distube } = require("distube")

        const empty = new MessageEmbed()
        .setColor(ee.color)
        .setAuthor("There is nothing in the queue right now")
        .setFooter(ee.text)
        .setTimestamp()

        if (!queue) return message.reply({ embeds: [empty] });

        const q = queue.songs.map((song, i) => `${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${song.formattedDuration}\``).join("\n")

		let textt = " AutoPlay is ";

        let embed = new Discord.MessageEmbed().setColor(ee.color).setTimestamp().setFooter(`${textt} ${queue.autoplay ? "on" : "off"}`);
        embed.setDescription(q.length >= 4093 ? q.substring(0, 4093) + '...' : q) 
        try {
            interaction.reply({embeds: [embed] });
        } catch(err) {
            console.log(err);
        }


    }
});
