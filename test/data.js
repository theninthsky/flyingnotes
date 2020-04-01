const { createReadStream } = require('fs')

const { PORT = 5000 } = process.env

exports.uri = `http://localhost:${PORT}`

exports.token = { bearer: '' }

const randomUserName = ~~(Math.random() * 1000000)

exports.user = {
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

exports.newNote = {
  color: '#f39c12',
  category: 'New Category',
  title: 'New Title',
  content: 'New Note.',
}
exports.newFile = {
  fileName: 'file1',
  file: createReadStream('test/assets/file1'),
}

exports.updatedNote = {
  color: '#27ae60',
  category: 'Updated Category',
  title: 'Updated Title',
  content: 'Updated note.',
}

exports.updatedFile = {
  fileName: 'file2',
  file: createReadStream('test/assets/file2'),
}
