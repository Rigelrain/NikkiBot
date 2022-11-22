const config = require('./config/config')
console.log(`[ START ] ${config.name} - Starting up...`)
const fs = require('node:fs')
const path = require('node:path')
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js')

const client = new Client({ intents: [GatewayIntentBits.Guilds] })
client.commands = new Collection()

// get sensitive tokens from process.ENV (for production) or from config files (for local development)
const token = process.env.TOKEN || require('./config/token').token
const mongoURL = process.env.DBPATH || require('./config/mongodb_config').path
const mongoDBname = process.env.DBNAME || require('./config/mongodb_config').dbname

// == DATABASE
const mongoose = require('mongoose')
console.log(`[ START ] Connecting to MongoDB... ( ${mongoURL} )`)
mongoose.connect(mongoURL, { // options below
  dbName: mongoDBname,
})
  .then(() => {
    console.log('[ START ] Database connected')
    const dbc = mongoose.connection
    dbc.on('error', console.error.bind(console, 'MongoDB connection error: '))
  })
  .catch(error => {
    console.log(`[ ERROR ] Cannot connect to database: ${error}`)
  })

// == COMMANDS - import commands from dir
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file)
  const command = require(filePath)
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command)
  } else {
    console.log(`[ WARN ] The command at ${filePath} is missing a required "data" or "execute" property.`)
  }
}

// ======== End setup

client.once(Events.ClientReady, () => {
  console.log('Ready!')
})

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return

  const command = client.commands.get(interaction.commandName)

  if (!command) return

  try {
    await command.execute(interaction)
  } catch (error) {
    console.error(error)
    await interaction.reply({ content: 'Encountered an error while executing this command.', ephemeral: true })
  }
})


// ======= Login to Discord
console.log('[ START ] Logging in to Discord...')
client.login(token)

// catch and log promise rejections
process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error))