/** @format */

const Command = require("../Structures/Command.js");
const ee = require("../../embed.json");
const { MessageEmbed } = require("discord.js");
const Client = require("../Structures/Client");
const { request } = require('undici')
const Discord = require("discord.js");
const img = "https://i.imgur.com/VFXr0ID.jpg"

module.exports = new Command({
    name: 'urban',
    description: 'Searches on the Urban dictionary',
    aliases: ['ub'],
    type: "BOTH",
	slashCommandOptions: [{
        name: "search",
        description: "What to search for",
        type: 'STRING',
        required: true
    }],
	permission: "SEND_MESSAGES",
    async run(message, args, cmd, client) {
        let ii;
        // check if args0 is urban then set ii to args1
        if (args[0] === "urban") {
            ii = args[1];
        } else {
            ii = args[0];
        }
        // if args0 is not urban then set ii to args0
        if (!args.length) return message.channel.send('You forgot to define your search term'); // Handles empty search queries
        
        try {
            let res = await request(`https://api.urbandictionary.com/v0/define?term=${ii}`).then(r => r.body.json().then(s => s.list)); // Searches on the urban dictionary API

            if (!res || !res.length) return message.channel.send('There were no results for your search term'); // Handles 0 results
            res = res[0]


            // Replacing [subwords] in definition
            let defmatch = res.definition.match(/\[.*?\]/gm)
            if (defmatch?.length) defmatch.forEach(v => {
                let subword = v.match(/(?<=\[)[^)]*(?=\])/gm)[0]
                res.definition = res.definition.replace(v, `[${subword}](https://www.urbandictionary.com/define.php?term=${subword.replace(/ /gm, '%20')})`)
            })
            
            // Replacing [subwords] in example
            let exmatch = res.example.match(/\[.*?\]/gm)
            if (exmatch?.length) exmatch.forEach(v => {
                let subword = v.match(/(?<=\[)[^)]*(?=\])/gm)[0]
                res.example = res.example.replace(v, `[${subword}](https://www.urbandictionary.com/define.php?term=${subword.replace(/ /gm, '%20')})`)
            })

            // Sending the message
            message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                        .setTitle(`Definition of ${res.word}`)
                        .setURL(res.permalink)
                        .setColor(ee.color)
                        .setThumbnail(img)
                        .addFields(
                            { name: 'Definition', value: !res.definition ? 'No Definition' : (res.definition.length > 1022 ? res.definition.substring(0, 1023) : res.definition) },
                            { name: 'Examples', value: !res.example ? 'No Definition' : (res.example.length > 1022 ? res.example.substring(0, 1023) : res.example) },
                            { name: '👍 Upvotes', value: res.thumbs_up.toLocaleString() || 'N/A', inline: true },
                            { name: '👎 Downvotes', value: res.thumbs_down.toLocaleString() || 'N/A', inline: true }
                        )
                        .setTimestamp(new Date(res.written_on).getTime())
                        .setFooter(ee.text)
                ]
            })
        } catch (err) {
            // Handles Errors
            message.reply('An error occured');
            console.error(err);
        }
    }
})