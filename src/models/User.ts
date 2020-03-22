import mongoose from 'mongoose'

import { NoteDocument, noteSchema } from './Note'

type UserDocument = mongoose.Document & {
  name: string
  email: string
  password: string
  notes: NoteDocument[]
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    validate: (value: string) => value.includes('@'),
  },
  password: {
    type: String,
    required: true,
  },
  notes: [noteSchema],
})

export default mongoose.model<UserDocument>('User', userSchema)
