const replyimg = require('./send-img');

let words = ["pitou", "ruger", "yourmomxd"]

const botReactions = (client) => {
	client.on('messageCreate', message => {

		for (let i = 0; i < words.length; i++){
			if (message.content.includes(words[i])) {
				replyimg(client, message);
			}
		}
	});
}

module.exports = botReactions;