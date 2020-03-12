/* E2E Tests */

const axios = require('axios')

const { PORT = 5000, WATCH } = process.env
const uri = `http://localhost:${PORT}`

const randomUserName = ~~(Math.random() * 1000000)

let user = {
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

const newNote = {
  color: '#f39c12',
  category: 'New Category',
  title: 'New Title',
  content: 'New Note.',
  // file: 'data:audio/mp3;base64,SUQzAwAACFATBVRBTEIAAAAZAJ6L',
}
const updatedNote = {
  color: '#27ae60',
  category: 'Updated Category',
  title: 'Updated Title',
  content: 'Updated note.',
  file: 'data:audio/mp3;base64,LFQzAwAACFJSBTOBTEI7g34KGR',
}
const file = {
  noteId: null,
  mimetype: null,
  buffer: null,
}

let sessionId = ''

describe('Default Route', () => {
  it('should respond with an html file and a 200 status code', async () => {
    const { status, headers } = await axios.get(uri)

    expect(headers['content-type']).toMatch(/html/)
    expect(status).toBe(200)
  })
})

/* Users Routes */
describe('Register', () => {
  it('should create and save a user', async () => {
    const {
      headers: { 'set-cookie': cookies },
      data: { name: savedName, notes: savedNotes },
    } = await axios.post(`${uri}/register`, user)

    expect(savedName).toBe(user.name)

    for (const note of savedNotes) {
      expect(note).toEqual(
        expect.objectContaining(user.notes[savedNotes.indexOf(note)]),
      )
    }

    user = { ...user, notes: savedNotes }

    expect(cookies[0]).toMatch(/connect.sid=s%/)
  })

  it('should not allow creating a duplicate user', async () => {
    try {
      await axios.post(`${uri}/register`, user)
    } catch ({ response }) {
      expect(response.data).toBe(
        'This email address is already registered, try login instead',
      )
    }
  })
})

describe('Login', () => {
  it('should login and return the name and notes', async () => {
    const {
      headers: { 'set-cookie': cookies },
      data: { name, notes },
    } = await axios.post(`${uri}/login`, user)

    expect(name).toBe(user.name)

    for (const note of notes) {
      expect(note).toEqual(
        expect.objectContaining(user.notes[notes.indexOf(note)]),
      )
    }

    expect(cookies[0]).toMatch(/connect.sid=s%/)

    sessionId = cookies[0]
  })

  it('should not allow an incorrect email or password', async () => {
    try {
      await axios.post(`${uri}/login`, {
        ...user,
        password: 'incorrectpassword',
      })
    } catch ({ response }) {
      expect(response.data).toBe('Incorrect email or password')
    }
  })
})

describe('Update', () => {
  it('should update the name and password', async () => {
    const {
      data: { name },
    } = await axios.put(
      `${uri}/register`,
      {
        name: 'Updated Test User',
        password: user.password,
        newPassword: '987654321',
      },
      { headers: { cookie: sessionId } },
    )

    expect(name).toBe('Updated Test User')

    user.name = 'Updated Test User'
    user.password = '987654321'
  })

  it('should not allow an incorrect password', async () => {
    try {
      await axios.put(`${uri}/register`, {
        password: 'incorrectpassword',
        newPassword: '198237645',
      })
    } catch ({ response }) {
      expect(response.data).toBe('Incorrect password')
    }
  })
})

describe('Logout', () => {
  it('should remove the session id', async () => {
    const {
      headers: { 'set-cookie': cookies },
      status,
    } = await axios.post(`${uri}/logout`)

    expect(cookies[0]).toMatch(/connect.sid=;/)
    expect(status).toBe(200)
  })
})

/* Notes Routes */
describe('Create Note', () => {
  it('should create and save a note', async () => {
    const {
      data: { newNote: savedNewNote },
    } = await axios.post(
      `${uri}/notes`,
      { ...newNote },
      {
        headers: { cookie: sessionId },
      },
    )

    file.noteId = savedNewNote._id
    file.dataUri = newNote.file
    delete newNote.file

    expect(savedNewNote).toEqual(expect.objectContaining(newNote))

    user.notes.push(savedNewNote)
  })
})

describe('Fetch Notes', () => {
  it('should return all notes', async () => {
    const {
      data: { notes },
    } = await axios.get(`${uri}/notes`, {
      headers: { cookie: sessionId },
    })

    for (const note of notes) {
      expect(note).toEqual(user.notes[notes.indexOf(note)])
    }
  })
})

describe('Update Note', () => {
  it('should replace the recieved note with the existing one', async () => {
    const {
      data: { updatedNote: savedUpdatedNote },
    } = await axios.put(
      `${uri}/notes`,
      {
        _id: user.notes[user.notes.length - 1]._id,
        ...updatedNote,
      },
      {
        headers: { cookie: sessionId },
      },
    )

    file.dataUri = updatedNote.file
    delete updatedNote.file

    expect(savedUpdatedNote).toEqual(expect.objectContaining(updatedNote))

    user.notes[user.notes.length - 1] = savedUpdatedNote
  })
})

describe('Delete Note', () => {
  it('should delete a note', async () => {
    const { status } = await axios.delete(`${uri}/notes`, {
      data: { noteId: user.notes[0]._id },
      headers: { cookie: sessionId },
    })

    expect(status).toBe(200)
  })

  it('should return a 404 status code for an invalid note id', async () => {
    try {
      await axios.delete(`${uri}/notes`)
    } catch ({ response }) {
      expect(response.status).toBe(404)
    }
  })
})

/* File Routes */
// describe('Download File', () => {
//   it('should send the file', async () => {
//     const {
//       data: { base64 },
//     } = await axios.get(`${uri}/${file.noteId}/file`)

//     expect(base64).toBe(newNote.file)
//   })
// })

describe('Delete File', () => {
  it('should delete the file', async () => {
    const { status } = await axios.delete(`${uri}/${file.noteId}/file`)

    expect(status).toBe(200)
  })
})

/* Terminate Test Server */
afterAll(async () => {
  if (!WATCH) {
    try {
      await axios(`${uri}/kill`)
      console.log('Test server successfully terminated')
    } catch ({ message }) {
      console.error(message)
    }
  }
})
