const { SlashCommandBuilder } = require('discord.js')
const { getNotes } = require('../js/db')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('getnote')
    .setDescription('Will dictate your notes.'),
  async execute(interaction) {
    await interaction.reply('Fetching notes...')

    const notes = await getNotes(interaction.user.id)

    // perform the DB action

    await interaction.followUp({ content: `Here are your notes: ${JSON.stringify(notes)}`, ephemeral: true })
  },
}