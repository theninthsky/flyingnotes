import mongoose from 'mongoose'

const fileSchema = new mongoose.Schema({
  noteId: mongoose.Schema.Types.ObjectId,
  mimetype: String,
  buffer: Buffer,
})

export default mongoose.model('File', fileSchema)
