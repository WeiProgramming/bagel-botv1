export const commands = {
  pings: {
    name: 'ping',
    description: 'this is a ping command!',
    execute(message, args) {
      message.channel.send('pong!')
    },
  },
}
