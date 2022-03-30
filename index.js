import Discord, { Intents } from 'discord.js'
import dotenv from 'dotenv'
import axios from 'axios'
import fs from 'fs'
import { commands } from './commands/commands.js'
dotenv.config()

const prefix = '-'

let serverInfo = {
  serverId: '747321613342474341',
  channeld: '833448582274351144',
}

var options = {
  method: 'GET',
  url: 'https://dad-jokes.p.rapidapi.com/random/joke',
  headers: {
    'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com',
    'X-RapidAPI-Key': '19bc8606d3msh818795b124bceefp15abd9jsn176b6320ee1c',
  },
}

async function getJoke() {
  try {
    const response = await axios.request(options)
    console.log(response.body)
    return response
  } catch (error) {
    console.error(error)
  }
}

const client = new Discord.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
})

client.commands = new Discord.Collection()

const testFunc = (message) => {
  let server = message.guild.id // ID of the guild the message was sent in
  let channel = message.channel.id // ID of the channel the message was sent in
  // console.log('server id ', server)
  // console.log('channel id ', channel)
}

for (const command in commands) {
  client.commands.set(commands[command].name, commands[command])
}

client.on('ready', () => {
  console.log(`WeiBot is Here`)
})

client.on('messageCreate', (msg) => {
  if (
    msg.content.toLowerCase().includes('#dad') &&
    msg.channel.id === serverInfo.channeld
  ) {
    const res = getJoke()
    res.then((data) => {
      console.log('test data ', data.data.body[0])
      setTimeout(function () {
        msg.reply({
          content: data.data.body[0]['setup'],
        })
        msg.reply({
          content: data.data.body[0]['punchline'],
        })
      }, 1000)
    })
  }
  return
})

client.on('messageCreate', (msg) => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return

  const args = msg.content.slice(prefix.length).split(' ')
  const command = args.shift().toLocaleLowerCase()
  if (command === 'ping') {
    client.commands.get('ping').execute(msg, args)
  } else if (command.includes('geo')) {
    msg.channel.send('ALL HAIL GEO!!!!!!')
  }
})

client.login(process.env.TOKEN)
