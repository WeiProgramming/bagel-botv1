import { MessageAttachment } from 'discord.js'

const attachment = new MessageAttachment(
  'https://cdn2.thelineofbestfit.com/images/made/images/remote/https_cdn2.thelineofbestfit.com/galleries/2014/Dua_Lipa_Heaven_London_310316_Wunmi_Onibudo-24_1107_738_90.jpg',
) //ex. https://i.imgur.com/random.jpg

export const commands = {
  pings: {
    name: 'ping',
    description: 'this is a ping command!',
    execute(message, args) {
      message.channel.send('pong!')
    },
  },
  lipa: {
    name: 'lipa',
    description: '',
    execute(message, args) {
      message.channel.send({
        content: 'This is for Chris',
        files: [attachment],
      })
    },
  },
}
