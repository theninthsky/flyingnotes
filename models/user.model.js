const mongoose = require('mongoose')

const { Schema } = mongoose

const noteSchema = new Schema({
  color: String,
  category: String,
  title: String,
  content: {
    type: String,
    required: true
  },
  date: {
    type: Number,
    required: true
  },
  fileName: String
})

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    validate: value => value.includes('@')
  },
  password: {
    type: String,
    required: true
  },
  notes: [noteSchema]
})

module.exports = mongoose.model('User', userSchema)
