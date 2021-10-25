const { prefix } = require('./config.json');

const deleter = (message, range) => {
	const range1 = range[0]; //indexes are already an array so we get the first index 
	const amnt = parseInt(range[1]) - parseInt(range[0]); //makes the str index ints
	var msgs, nID;
	
	message.channel.messages.fetch({
		limit: range1,
	}).then(a => {
		msgs = Array.from(a);
		nID = msgs[range1-1][0];
	}).then( () => message.channel.messages.fetch({
		limit: amnt,
		before: nID
	})).then(b => {
		message.channel.bulkDelete(b);
	});

}

module.exports = deleter;