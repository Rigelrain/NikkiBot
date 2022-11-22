const mongoose = require('mongoose')
const Schema = mongoose.Schema

const noteSchema = new Schema({
  userID: String, // ID of the user who made the request
  note: String, // The note contents
  tags: [String],
  expiration: Date,
})

//noteSchema.index({serverID: 1})
//noteSchema.index({userID: 1})

module.exports = mongoose.model('Note', noteSchema)