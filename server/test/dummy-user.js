export const user = {
  name: 'Test User',
  email: 'user@test.com',
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
  fileName: 'hello',
  file: Buffer.from('Hello'),
}

export const updatedNote = {
  color: '#27ae60',
  category: 'Updated Category',
  title: 'Updated Title',
  content: 'Updated note.',
}
export const updatedFile = {
  fileName: 'world',
  file: Buffer.from('World'),
}
