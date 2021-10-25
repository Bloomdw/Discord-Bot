function send(message, url){
    message.channel.send({
      files: [{
        attachment: url,
        name: 'Neferpitou_hesitates.png'
      }]
    });
}

function attachIsImage(msgAttach) {
    const im = msgAttach.attachments;
    //True if this url is a png image.

    img = Array.from(im);
    
    try {
    	const ctype = img[0][1].contentType;
    	if (ctype.includes('image')) {
            console.log("success n stuf");
            send(this.message, img[0][1].url);
            return true;
        }
    }
    catch {
        //console.log(msgAttach);
    	return;
    }
}

const thing1 = (message, range) => {
    const id = message.id;
    const amnt = parseInt(range[1]) - parseInt(range[0]); 
    const range1 = range[0]; 

    message.channel.messages.fetch({
        limit: range[0],
    }).then(a => {
        msgs = Array.from(a);
        nID = msgs[range1-1][0];
    }).then( () => message.channel.messages.fetch({
        limit: amnt,
        before: nID
    })).then(b => {
        b.each(attachIsImage, {message: message})
    });
}

module.exports = thing1;