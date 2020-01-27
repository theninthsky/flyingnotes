import mongoose, { Document, Schema } from 'mongoose'

interface IFile extends Document {
  noteId: string
  base64: string
}

const fileSchema: Schema = new Schema({
  noteId: Schema.Types.ObjectId,
  base64: String
})

export default mongoose.model<IFile>('File', fileSchema)
