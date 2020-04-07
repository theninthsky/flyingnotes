import chai from 'chai'

import agent from '../agent.js'
import {
  user,
  newNote,
  newFile,
  updatedNote,
  updatedFile,
} from '../dummy-user.js'

const { expect } = chai

setTimeout(function () {
  describe('Fetch Notes', function () {
    it('should return all notes', async function () {
      const res = await agent.get('/notes')

      expect(res.body.notes).to.have.lengthOf(2)

      for (const note of res.body.notes) {
        expect(note).to.deep.include(user.notes[res.body.notes.indexOf(note)])
      }

      user.notes = res.body.notes
    })
  })

  describe('Create Note', function () {
    it('should create and save a note', async function () {
      const res = await agent
        .post('/notes')
        .type('form')
        .field('color', newNote.color)
        .field('category', newNote.category)
        .field('title', newNote.title)
        .field('content', newNote.content)
        .attach('file', newFile.file, newFile.fileName)

      expect(res.body.newNote).to.deep.include(newNote)
      expect(res.body.newNote.fileName).to.equal(newFile.fileName)

      user.notes.push(res.body.newNote)
    })
  })

  describe('Update Note', function () {
    it('should replace the recieved note with the existing one', async function () {
      const res = await agent
        .put('/notes')
        .type('form')
        .field('_id', user.notes[user.notes.length - 1]._id)
        .field('color', updatedNote.color)
        .field('category', updatedNote.category)
        .field('title', updatedNote.title)
        .field('content', updatedNote.content)
        .attach('file', updatedFile.file, updatedFile.fileName)

      expect(res.body.updatedNote).to.deep.include(updatedNote)
      expect(res.body.updatedNote.fileName).to.equal(updatedFile.fileName)

      user.notes[user.notes.length - 1] = res.body.updatedNote
    })
  })

  describe('Delete Note', function () {
    it('should delete a note', async function () {
      const res = await agent
        .delete('/notes')
        .send({ noteID: user.notes[0]._id })

      expect(res).to.have.status(200)

      user.notes.shift()
    })

    it('should return a 404 status code for an invalid note id', async function () {
      const res = await agent.delete('/notes').send({
        noteID: 'invalid',
      })

      expect(res).to.have.status(404)
    })
  })
}, 1000)
