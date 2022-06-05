/** @format */

const Command = require("../Structures/Command.js");
const ee = require("../../embed.json");
const { MessageEmbed } = require("discord.js");
const Client = require("../Structures/Client");
const Discord = require("discord.js");



module.exports = new Command({
	name: "queue",
	description: "queue",
	aliases: ['q'],
	type: "Text",
	slashCommandOptions: [],
	permission: "CONNECT",
	async run(message, args, cmd, client) {
		const distube = require("distube")

        const queue = client.distube.getQueue(message)
        const nan1 = new MessageEmbed()
        .setColor(ee.color)
        .setAuthor("There is nothing in the queue right now")
        .setFooter(ee.text)
        .setTimestamp()

        if (!queue) return message.reply({ embeds: [nan1] });
        const q = queue.songs.map((song, i) => `${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${song.formattedDuration}\``).join("\n")
		let textt = " AutoPlay is ";
        let embed = new Discord.MessageEmbed().setColor(ee.color).setTimestamp().setFooter(`${textt} ${queue.autoplay ? "on" : "off"}`);
        embed.setDescription(q.length >= 4093 ? q.substring(0, 4093) + '...' : q) 
        try {
            message.channel.send({embeds: [embed] });
        } catch(err) {
            console.log(err);
        }
	}
});
