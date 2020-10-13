const fs = require('fs');
const clientIdFile = require('../Things/ClientID');
const clientId = clientIdFile.clientId
module.exports = {
	name: 'invite',
	description: 'Invite link to this bot.',
	execute(message, args) {
		message.channel.send(`https://discord.com/oauth2/authorize?client_id=` + `${clientId}` + `&scope=bot`);
	},
};
