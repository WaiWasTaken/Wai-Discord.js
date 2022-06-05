// https://top.gg/bot/762243627274993665

/** @format */

const Command = require("../Structures/Command.js");
const ee = require("../../embed.json");
const { MessageEmbed } = require("discord.js");
const Client = require("../Structures/Client");
const Discord = require("discord.js")



module.exports = new Command({
    name: "help",
    description: "Help command",
    aliases: ['h'],
    type: "Text",
    slashCommandOptions: [],
    permission: "CONNECT",
    async run(message, args, cmd, client) {
        const embed = new MessageEmbed()
        embed.setColor(ee.color).setAuthor({ name: "Get information about all commands (click)", iconURL: client.user.displayAvatarURL(), url: "https://top.gg/bot/762243627274993665" }).setFooter(ee.text).setTimestamp()
        message.reply({ embeds: [embed] })
    }
});
