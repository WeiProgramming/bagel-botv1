import Discord, { Intents } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'
import dotenv from 'dotenv'
import axios from 'axios'
dotenv.config()

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

client.on('ready', () => {
  console.log(`WeiBot is Here`)
})

client.on('messageCreate', (msg) => {
  if (msg.content.toLowerCase().includes('#dad')) {
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
})

client.on('messageCreate', (msg) => {
  if (msg.content.toLowerCase().includes('ping')) {
    setTimeout(function () {
      msg.reply({
        content: 'pong',
      })
    }, 1000)
  }
})

client.on('messageCreate', (msg) => {
  if (msg.author.bot) return
  if (msg.content.toUpperCase().includes('GEO')) {
    setTimeout(function () {
      msg.reply({
        content: 'ALL HAIL GEO!!!!!!',
      })
    }, 1000)
  }
})

client.login(process.env.TOKEN)
