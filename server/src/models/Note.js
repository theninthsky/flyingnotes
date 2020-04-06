import mongoose from 'mongoose'

export default new mongoose.Schema({
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
