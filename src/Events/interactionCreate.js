const { PlayerSubscription } = require("@discordjs/voice");
const Event = require("../Structures/Event.js");

module.exports = new Event("interactionCreate", (client, interaction) => {
    if (interaction.user.bot || !interaction.isCommand() || !interaction.guild)
        return;

    const args = [
        interaction.commandName,
        ...client.commands
            .find(cmd => cmd.name.toLowerCase() == interaction.commandName)
            .slashCommandOptions.map(v => `${interaction.options.get(v.name).value}`)
    ];

    const command = client.commands.find(cmd => cmd.name.toLowerCase() == interaction.commandName);
    if (!command) return interaction.reply("That is not a valid command!");

    /*
    const SlashPlay = client.commands.find(cmd => cmd.name == "Play");
    console.log(SlashPlay);

    if there are 2 same commands whit same name but 1 is text and 1 is slash just replace slash 1 to "Example" from "example"
    */

    const permission = interaction.member.permissions.has(command.permission);
    if (!permission) return interaction.reply("You do not have the correct permissions to run this command!");

    command.run(interaction, args, client);
});