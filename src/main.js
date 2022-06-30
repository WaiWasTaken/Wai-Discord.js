/** @format */

// Note: you will likely receive unexpected errors if you don't return or stop the code

console.clear();
require('dotenv').config();
const Client = require("./Structures/Client.js");
const client = new Client();
const config = require("../config.json");

client.start(process.env.token);
const { SpotifyPlugin } = require("@distube/spotify");
const { YtDlpPlugin } = require('@distube/yt-dlp');

const DisTube = require("distube");
client.distube = new DisTube.default(client, {
	leaveOnFinish: true,
	leaveOnEmpty: true,
	emptyCooldown: 10,
	leaveOnStop: true,
	plugins: [
		new SpotifyPlugin({
			emitEventsAfterFetching: true
		}),
		new YtDlpPlugin(),
	],
	youtubeDL: false
});


new SpotifyPlugin({
	parallel: true,
	emitEventsAfterFetching: false,
	api: {
		clientId: " ",
		clientSecret: " ",
	},
});


const Discord = require("discord.js");
const ee = require("../embed.json");
const message = require("../src/Events/messageCreate")


const IDs = require("./id.js");
let waitID = IDs.waitID;
let leaveID = IDs.leaveID;
let skipID = IDs.skipID;




const { MessageActionRow, MessageButton } = require('discord.js');
const { distube } = require("distube");





const playMenu = new MessageActionRow()
	.addComponents(
		new MessageButton()
			.setCustomId(leaveID)
			.setLabel('Leave')
			.setStyle('DANGER'),
		new MessageButton()
			.setCustomId(skipID)
			.setLabel('Skip')
			.setStyle('SECONDARY'),
		new MessageButton()
			.setCustomId(waitID)
			.setLabel('Pause')
			.setStyle('SUCCESS')
	);


client.on('interactionCreate', async (interaction) => {
	if (interaction.isButton()) {
		if (!interaction.guild.me.voice.channel) {
			const embed = new Discord.MessageEmbed();

			embed
				.setColor(ee.color)
				.setTimestamp()
				.setAuthor('I am not in a voice channel') 
				.setFooter({text: ee.text})

			interaction.reply({ embeds: [embed], ephemeral: true });

			return;
		}
		if (!interaction.member.voice.channel) {
			const embed = new Discord.MessageEmbed();

			embed
				.setColor(ee.color)
				.setTimestamp()
				.setAuthor('Please join a voice channel')
				.setFooter({text: ee.text})

			interaction.reply({ embeds: [embed], ephemeral: true });

			return;
		}
		const notInSame = new Discord.MessageEmbed()
			.setColor(ee.color)
			.setTimestamp()
			.setAuthor('Someone else is already listening to music in different channel')
			.setFooter({text: ee.text})


		if (interaction.member.guild.me.voice.channelId !== interaction.member.voice.channelId) {
			return interaction.reply({ embeds: [notInSame], ephemeral: true })
		}

		if (interaction.customId === leaveID) {
			const queue = await client.distube.getQueue(interaction);

			let waitCheck;
			let TEXT;
			let Style1;
			if (queue.paused) {
				waitCheck = true;
			} else {
				waitCheck = false;
			}
			if (waitCheck === true) {
				TEXT = "Resume";
				Style1 = "PRIMARY";
			} else {
				TEXT = "Pause";
				Style1 = "SUCCESS";
			}
			interaction.update({
				components: [new MessageActionRow().addComponents(
					new MessageButton()
						.setCustomId(leaveID)
						.setLabel('Bye')
						.setStyle('SUCCESS')
						.setDisabled(true),
					new MessageButton()
						.setCustomId(skipID)
						.setLabel('Skip')
						.setStyle('SECONDARY')
						.setDisabled(true),
					new MessageButton()
						.setCustomId(waitID)
						.setLabel(`${TEXT}`)
						.setStyle(`${Style1}`)
						.setDisabled(true)
				)]
			});

			queue.stop();
		}
		if (interaction.customId === skipID) {
			const queue1 = await client.distube.getQueue(interaction);
			const queue = await client.distube.getQueue(interaction);
			let waitCheck;
			let TEXT;
			let Style1;
			if (queue.paused) {
				waitCheck = true;
			} else {
				waitCheck = false;
			}
			if (waitCheck === true) {
				TEXT = "Resume";
				Style1 = "PRIMARY";
			} else {
				TEXT = "Pause";
				Style1 = "SUCCESS";
			}
			// check if the queue is empty
			if (!queue1.autoplay && queue1.songs.length <= 1) { queue.toggleAutoplay() }
				interaction.update({
					components: [new MessageActionRow().addComponents(
						new MessageButton()
							.setCustomId(leaveID)
							.setLabel('Leave')
							.setStyle('DANGER')
							.setDisabled(true),
						new MessageButton()
							.setCustomId(skipID)
							.setLabel('Skipped')
							.setStyle('SECONDARY')
							.setDisabled(true),
						new MessageButton()
							.setCustomId(waitID)
							.setLabel(`${TEXT}`)
							.setStyle(`${Style1}`)
							.setDisabled(true)
					)]
				});
				if (queue.paused) {
					queue.resume();
				}
				queue1.skip();
			
		}

		if (interaction.customId === waitID) {
			const queue = await client.distube.getQueue(interaction);
			if (queue.paused) {
				// if paused, resume
				interaction.update({
					components: [new MessageActionRow().addComponents(
						new MessageButton()
							.setCustomId(leaveID)
							.setLabel('Leave')
							.setStyle('DANGER'),
						new MessageButton()
							.setCustomId(skipID)
							.setLabel('Skip')
							.setStyle('SECONDARY'),
						new MessageButton()
							.setCustomId(waitID)
							.setLabel('Pause')
							.setStyle('SUCCESS')
					)]
				});
				queue.resume();
			} else {
				// if not paused, pause
				interaction.update({
					components: [new MessageActionRow().addComponents(
						new MessageButton()
							.setCustomId(leaveID)
							.setLabel('Leave')
							.setStyle('DANGER'),
						new MessageButton()
							.setCustomId(skipID)
							.setLabel('Skip')
							.setStyle('SECONDARY'),
						new MessageButton()
							.setCustomId(waitID)
							.setLabel('Resume')
							.setStyle('PRIMARY')
					)],
				})

				queue.pause();
			}
			return;

		}

		// create if interactio.customid doesnt inclued leaveID and skipID
		if (!interaction.customId.includes(leaveID) && !interaction.customId.includes(skipID)) {
			interaction.component.setStyle('PRIMARY') && interaction.component.setLabel("Sorry | This button has expired") && interaction.component.setDisabled(true) && interaction.update({ components: [new MessageActionRow().addComponents(interaction.component)] });
		}
	}
})


const errorr = new Discord.MessageEmbed()
	.setColor(ee.color)
	.setAuthor("Sorry an error occurred")
	.setTimestamp()
	.setFooter({text: ee.text})
const errorr2 = new Discord.MessageEmbed()
	.setColor(ee.color)
	.setAuthor("Sorry this video is age restricted")
	.setTimestamp()
	.setFooter({text: ee.text})	
const errorr3 = new Discord.MessageEmbed()
	.setColor(ee.color)
	.setAuthor("No results found")
	.setTimestamp()
	.setFooter({text: ee.text})

client.distube
	.on('playSong', async (queue, song) => {
		let userr
		if (song.user.id == client.user.id) {
			userr = "``Autoplay is enabled``"
		} else {
			userr = `Requested by: ${song.user}`
		}
		const playy = new Discord.MessageEmbed()
			.setColor(ee.color)
			.setAuthor({ name: `Playing ${song.name}`, /*iconURL: client.user.avatarURL() ,*/ url: song.url })
			//.setTitle(`Playing ${song.name}`)
			//.setURL(song.url)
			.setDescription(userr)
			.setTimestamp()
			.setFooter({ text: ee.text, iconURL: client.user.avatarURL() })
		queue.textChannel?.send({ embeds: [playy], components: [playMenu] });
	})

	.on('addList', async (queue, playlist) => {
		const addd = new Discord.MessageEmbed()
			.setColor(ee.color)
			.setAuthor({ name: `Added ${playlist.name}`, /*iconURL: client.user.avatarURL() ,*/ url: playlist.url })
			//.setTitle(`Added ${playlist.name}`)
			//.setURL(song.url)
			.setDescription(`Requested by: ${playlist.user}`)
			.setTimestamp()
			.setFooter({ text: ee.text, iconURL: client.user.avatarURL() })
		if (!queue.songs.length >= 2) return queue.textChannel?.send({ embeds: [addd] });
	})
	.on('addSong', async (queue, song) => {	
		const addd = new Discord.MessageEmbed()
			.setColor(ee.color)
			.setAuthor({ name: `Added ${song.name}`, /*iconURL: client.user.avatarURL() ,*/ url: song.url })
			//.setTitle(`Added ${song.name}`)
			//.setURL(song.url)
			.setDescription(`Requested by: ${song.user}`)
			.setTimestamp()
			.setFooter({ text: ee.text, iconURL: client.user.avatarURL() })
		if (queue.songs.length >= 2) return queue.textChannel?.send({ embeds: [addd] })

	})
	.on('error', (textChannel, e) => {
		console.error(e)
		// check if error includes Sign in to confirm your age
		if (e.message.includes('Sign in to confirm your age')) {
			textChannel.send({ embeds: [errorr2] });
		} else if(e.message.includes('No result found')) {
			textChannel.send({ embeds: [errorr3] });
		} else {
			textChannel.send({ embeds: [errorr] })
		}
	})


// if (Queue.previousSongs.length < 1) return;
