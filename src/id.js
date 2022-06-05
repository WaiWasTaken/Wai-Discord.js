let skipID;
let leaveID;
let waitID;

function resetID() {

	//Can change 7 to 2 for longer results.
	skipID = (Math.random() + 1).toString(36).substring(2);

	//Can change 7 to 2 for longer results.
	leaveID = (Math.random() + 1).toString(36).substring(2);

	//Can change 7 to 2 for longer results.
	waitID = (Math.random() + 1).toString(36).substring(2);
}
resetID();
module.exports = {
    waitID,
    skipID,
    leaveID
}