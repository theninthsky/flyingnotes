import mongoose from 'mongoose'

export type NoteDocument = mongoose.Document & {
  color?: string
  category?: string
  title?: string
  content: {
    type: string
  }
  date: Date
  fileName: string
}

export const noteSchema = new mongoose.Schema<NoteDocument>({
  color: String,
  category: String,
  title: String,
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  fileName: String,
})
