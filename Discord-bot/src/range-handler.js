const del_messages = require('./del-messages');
const dl_ims = require('./dl-images');

const rgHandler = (message, content, command) => {
	const com = command.replace('^', '');
	let idx = content.substr(content.indexOf(' ')+1);
	console.log("idx:" + idx);
	idx = idx.split("-");

	if (com == 'delmsg') {
		del_messages(message, idx);
	}
	else if (com == 'dlimgs') {
		dl_ims(message, idx);
	}
}

module.exports = rgHandler;