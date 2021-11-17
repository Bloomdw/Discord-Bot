const config = require('./config.json');
const command = require('./command');
const firstMessage = require('./first-message');
const rg_handler = require('./range-handler');
const reactions = require('./bot-reactions');

const { Client, Intents, Permissions } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
	console.log(`${client.user.username}`);

		//Simple reply msg uwu 
	command(client, 'ping', message => {
		message[0].channel.send('Pong!');
	});



	//List how many users (or bots) are on the server *change to only listing non-bot users*
	command(client, 'servers', message => {
		client.guilds.cache.forEach((guild) => {
			message[0].channel.send(
				`${guild.name} has a total of ${guild.memberCount} members!`);
		});
	});

	//Clear all the messages in a channel *change it to clear only the msgs that match a certain word
	//or which are from a certain user*
	command(client, 'clearchannel', message => {
		if (message[0].member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
			message[0].channel.messages.fetch().then((results) => {
				message[0].channel.bulkDelete(results);
			});
		}
	});

	//Status and stuff (works now)
	command(client, 'status', message => {
		let content = message[0].content;
		content = content.substr(content.indexOf(' ')+1);
		//console.log(`content: ${content}`)

		client.user.setStatus('online');
		client.user.setPresence({
			activities:[{
				name: content, 
				type: 'PLAYING',
				url: 'https://discord.com'
			}]
		});
	});

	command(client, 'delmsg', message => {
		const command = message[1]; let content = message[0].content;  
		rg_handler(message[0], content, command);
	});

	command(client, 'dlimgs', message => {
		const command = message[1]; let content = message[0].content;  
		rg_handler(message[0], content, command);
	});

	reactions(client);

	//firstMessage(client, '897626990960582668', 'hello world!!!', ['🧏‍♂️', '😁']);
});

client.login(config.token);


