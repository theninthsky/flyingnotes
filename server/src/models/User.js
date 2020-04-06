import mongoose from 'mongoose'

import noteSchema from './Note.js'

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
    validate: value => value.includes('@'),
  },
  password: {
    type: String,
    required: true,
  },
  notes: [noteSchema],
})

export default mongoose.model('User', userSchema)
