const axios = require('axios')

const FormData = require('form-data')

const {
  uri,
  token,
  user,
  newNote,
  newFile,
  updatedNote,
  updatedFile,
} = require('../data')

exports.notesTests = () => {
  describe('Create Note', () => {
    it('should create and save a note', async () => {
      const { color, category, title, content } = newNote
      const { fileName, file } = newFile

      const form = new FormData()

      form.append('color', color)
      form.append('category', category)
      form.append('title', title)
      form.append('content', content)
      form.append('file', file)

      const {
        data: { newNote: savedNewNote },
      } = await axios.post(`${uri}/notes`, form, {
        headers: { cookie: token.bearer, ...form.getHeaders() },
      })

      expect(savedNewNote).toEqual(expect.objectContaining(newNote))
      expect(savedNewNote.fileName).toBe(fileName)

      user.notes.push(savedNewNote)
    })
  })

  describe('Fetch Notes', () => {
    it('should return all notes', async () => {
      const {
        data: { notes },
      } = await axios.get(`${uri}/notes`, {
        headers: { cookie: token.bearer },
      })

      for (const note of notes) {
        expect(note).toEqual(user.notes[notes.indexOf(note)])
      }

      expect(notes.length).toBe(3)
    })
  })

  describe('Update Note', () => {
    it('should replace the recieved note with the existing one', async () => {
      const { color, category, title, content } = updatedNote
      const { fileName, file } = updatedFile

      const form = new FormData()

      form.append('_id', user.notes[user.notes.length - 1]._id)
      form.append('color', color)
      form.append('category', category)
      form.append('title', title)
      form.append('content', content)
      form.append('file', file)

      const {
        data: { updatedNote: savedUpdatedNote },
      } = await axios.put(`${uri}/notes`, form, {
        headers: { cookie: token.bearer, ...form.getHeaders() },
      })

      expect(savedUpdatedNote).toEqual(expect.objectContaining(updatedNote))
      expect(savedUpdatedNote.fileName).toBe(fileName)

      user.notes[user.notes.length - 1] = savedUpdatedNote
    })
  })

  describe('Delete Note', () => {
    it('should delete a note', async () => {
      const { status } = await axios.delete(`${uri}/notes`, {
        data: { noteId: user.notes[1]._id },
        headers: { cookie: token.bearer },
      })

      expect(status).toBe(200)
    })

    it('should return a 404 status code for an invalid note id', async () => {
      try {
        await axios.delete(`${uri}/notes`, {
          data: { noteId: 'invalid' },
          headers: { cookie: token.bearer },
        })
      } catch ({ response }) {
        expect(response.status).toBe(404)
      }
    })
  })
}
