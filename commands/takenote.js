const { SlashCommandBuilder } = require('discord.js')
const wait = require('node:timers/promises').setTimeout
const { newNote } = require('../js/db')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('takenote')
    .setDescription('Saves a note.')
    .addStringOption(option =>
      option.setName('note')
        .setDescription('The note to save')
        .setRequired(true)),
  async execute(interaction) {
    const note = interaction.options.getString('note')

    await interaction.reply({ content: 'Taking notes...', ephemeral: true })

    const newnote = await newNote({
      userID: interaction.user.id,
      note,
    })

    await wait(1000)

    // perform the DB action

    await interaction.editReply('Note taken.')
    await interaction.followUp({ content: `Echo: ${newnote}`, ephemeral: true })
  },
}