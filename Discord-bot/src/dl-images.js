var fs = require('fs');
var https = require('https');
import * as Struct from 'ref-struct'
import { DModel as M, DStruct as DS } from 'win32-api'

const path: M.path_struct = new Struct(DS.KNOWNFOLDERID)();

//Node.js Function to save image from External URL.
function saveImageToDisk(url, localPath) {
    var fullUrl = url;
    var file = fs.createWriteStream(localPath);
    var request = https.get(url, function(response) {
    response.pipe(file);
    });
}

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
    console.log(im);
    //True if this url is a png image.

    img = Array.from(im);
        
    try {
    	const ctype = img[0][1].contentType;
    	if (ctype.includes('image')) {
            const imgr = img[0][1];
            //const type = imgr.contentType;
            console.log("C:\\Users\\julkt\\Pictures\\thetrest\\" + imgr.name)
            //send(this.message, img[0][1].url);
            fs.mkdirSync("C:\\Users\\julkt\\Pictures\\thetrest\\test", { recursive: true });
            saveImageToDisk(img[0][1].url, "C:\\Users\\julkt\\Pictures\\thetrest\\test\\" + imgr.name);
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