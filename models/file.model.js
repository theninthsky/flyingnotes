const mongoose = require('mongoose')

const { Schema } = mongoose

const fileSchema = new Schema({
  noteId: Schema.Types.ObjectId,
  dataUri: String
})

module.exports = mongoose.model('File', fileSchema)
