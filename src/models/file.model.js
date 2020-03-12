const mongoose = require('mongoose')

const { Schema } = mongoose

const fileSchema = new Schema({
  noteId: Schema.Types.ObjectId,
  mimetype: String,
  buffer: Buffer
})

module.exports = mongoose.model('File', fileSchema)
