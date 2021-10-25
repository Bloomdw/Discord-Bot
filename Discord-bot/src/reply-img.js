function attachIsImage(msgAttach) {
    var url = msgAttach.url;
    //True if this url is a png image.

    img = Array.from(msgAttach);
    
    try {
    	const ctype = img[0][1].contentType;
    	if (ctype.includes('image')) return true;
    }
    catch {
    	return;
    }
}

const thing1 = (client, args, message) => {
	client.on('messageCreate', message => {
		if (message.author.bot) return;

		if (message.attachments.size > 0){
			if (attachIsImage(message.attachments)){
				message.channel.send({
				  files: [{
				    attachment: 'https://static.wikia.nocookie.net/hunterxhunter/images/8/8b/Neferpitou_hesitates.png/revision/latest?cb=20131204134759',
				    name: 'Neferpitou_hesitates.png'
				  }]
				});
			}
		}

		//){
		//	message.attachments.each(attachIsImage);
		//}
	})
}

module.exports = thing1;