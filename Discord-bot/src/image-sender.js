const { MessageAttachment } = require('discord.js')
const Commando = require('discord.js-commando')

module.exports = class ImageCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'image',
      group: 'misc',
      memberName: 'image',
      description: 'Sends an image',
    })
  }

  run = (message) => {
    const attachment = new MessageAttachment('https://static.wikia.nocookie.net/hunterxhunter/images/8/8b/Neferpitou_hesitates.png/revision/latest?cb=20131204134759')

    message.reply('Here is an image', attachment)
  }
}