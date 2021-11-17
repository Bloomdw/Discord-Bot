const send = (client, message) => {
	if (message.author.bot) return;

	message.channel.send({
	  files: [{
	    attachment: 'https://static.wikia.nocookie.net/hunterxhunter/images/8/8b/Neferpitou_hesitates.png/revision/latest?cb=20131204134759',
	    name: 'Neferpitou_hesitates.png'
	  }]
	});
	
	//){
	//	message.attachments.each(attachIsImage);
	//}

}

module.exports = send;