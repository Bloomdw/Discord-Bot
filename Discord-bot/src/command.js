const { prefix } = require('./config.json')

module.exports = (client, args, callback) => {
	if (typeof args == 'string') {
		args = [args];
	}
	client.on('messageCreate', (message) => {
		if (message.author.bot) return;

		const { content } = message;

		args.forEach(arg => { 
			const command = `${prefix}${arg}`

			if (content.startsWith(`${command}`) || content === command)
			{
				console.log(`Running command: ${command}`);
				callback([message, command]);
			}
		});
	});
}
