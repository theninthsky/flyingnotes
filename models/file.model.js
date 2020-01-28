const mongoose = require('mongoose')

const { Schema } = mongoose

const fileSchema = new Schema({
  noteId: Schema.Types.ObjectId,
  base64: String
})

module.exports = mongoose.model('File', fileSchema)
