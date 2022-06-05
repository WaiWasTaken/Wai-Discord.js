/** @format */

const Event = require("../Structures/Event.js");
const package = require("../../package.json");
const IDs = require("../id.js");
let waitID = IDs.waitID;
let leaveID = IDs.leaveID;
let skipID = IDs.skipID;

module.exports = new Event("ready", client => {

	// "Guilds": client.guilds.cache.size, "Users": client.users.cache.size
	let isTestBot;
	if (client.user.id === "762243627274993665") isTestBot = false;
	if (client.user.id === "910200515361665047") isTestBot = true;
	Online = true;
	console.table([{ "Online": Online, "Version": package.version,"Guilds": client.guilds.cache.size, "Users": client.users.cache.size, "TestBot": isTestBot, "Node.js": process.version, "Discord.js": package.dependencies["discord.js"].replace("^", ""), "WaitID": waitID, "SkipID": skipID, "LeaveID": leaveID }]);
	client.user.setPresence({ activities: [{ name: 'not really', type: "STREAMING", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}]})
});
