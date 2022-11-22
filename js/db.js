const Note = require('../schemas/Note')

module.exports = {
  /**
   * 
   * @param {string} id - user id
   */
  async getNotes(id) {
    const data = await Note.find({userID: id}).lean().exec()

    // console.log(`[ DB ] Request: ${JSON.stringify(data, null, 2)}`)

    if(!data) {
      return undefined
    }

    return data
  },
  async getNote(id) {
    const data = await Note.findById(id).lean().exec()
    // console.log(`[ DB ] Request: ${JSON.stringify(data, null, 2)}`)

    if(!data) {
      return undefined
    }

    return data
  },
  async newNote(data) {
    const newNote = await Note.create(data)

    // console.log(`[ DB ] New request saved: ${JSON.stringify(newReq, null, 2)}`)
    return newNote
  },
  /**
   * 
   * @param {string} id - request _id
   * @param {any} data 
   */
  async updateNote(id, data) {
    const updated = await Note.findByIdAndUpdate(id, data, {new:true, lean: true}).exec()

    //console.log(`[ DB ] Request updated to: ${JSON.stringify(updatedReq, null, 2)}`)
    return updated
  },
  /**
   * 
   * @param {string} id - request _id
   */
  async deleteNote(id) {
    await Note.findByIdAndDelete(id).exec()
    return
  },
}