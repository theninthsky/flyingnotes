import mongoose from 'mongoose'

type FileDocument = mongoose.Document & {
  noteId: string
  mimetype: string
  buffer: Buffer
}

const fileSchema = new mongoose.Schema({
  noteId: mongoose.Schema.Types.ObjectId,
  mimetype: String,
  buffer: Buffer,
})

export default mongoose.model<FileDocument>('File', fileSchema)
