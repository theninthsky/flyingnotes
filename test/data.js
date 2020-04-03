import { createReadStream } from 'fs'

const { PORT = 5000 } = process.env

export const uri = `http://localhost:${PORT}`

export const token = { bearer: '' }

const randomUserName = ~~(Math.random() * 1000000)

export const user = {
  name: `Test User No. ${randomUserName}`,
  email: `${randomUserName}@test.com`,
  password: '123456789',
  notes: [
    {
      color: '#c0392b',
      category: 'Test Category 1',
      title: 'Test Title 1',
      content: 'A simple test 1.',
      date: Date.now(),
    },
    {
      color: '#d35400',
      category: 'Test Category 2',
      title: 'Test Title 2',
      content: 'A simple test 2.',
      date: Date.now(),
    },
  ],
}

export const newNote = {
  color: '#f39c12',
  category: 'New Category',
  title: 'New Title',
  content: 'New Note.',
}
export const newFile = {
  fileName: 'file1',
  file: createReadStream('test/assets/file1'),
}

export const updatedNote = {
  color: '#27ae60',
  category: 'Updated Category',
  title: 'Updated Title',
  content: 'Updated note.',
}

export const updatedFile = {
  fileName: 'file2',
  file: createReadStream('test/assets/file2'),
}
