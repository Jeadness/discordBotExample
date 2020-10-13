const config = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();
const tokenFile = require('./Things/token.json');
const token = tokenFile.token
const prefix = config.prefix
const { clientId } = require('./Things/ClientID.json');
const fs = require('fs');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
client.on('ready', () => {
	console.log(config.consoleBotReadyMessage);
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

const args = message.content.slice(prefix.length).trim().split(' ');
const command = args.shift().toLowerCase();
if (!client.commands.has(command)) return;

try {
	client.commands.get(command).execute(message, args);
} catch (error) {
	console.error(error);
	message.reply(config.consoleCommandErrorMessage);
}
});
client.login(token);
