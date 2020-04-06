import axios from 'axios'

import { uri, user, token } from '../data'

export default () => {
  describe('Default Route', () => {
    it('should respond with an html file and a 200 status code', async () => {
      const { status, headers } = await axios.get(uri)

      expect(headers['content-type']).toMatch(/html/)
      expect(status).toBe(200)
    })
  })

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

      user.notes = savedNotes

      expect(cookies[0]).toMatch(/Bearer=/)
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

      expect(cookies[0]).toMatch(/Bearer=/)

      token.bearer = cookies[0].split(';')[0]
    })

    it('should not allow an incorrect email or password', async () => {
      try {
        await axios.post(`${uri}/login`, {
          ...user,
          password: 'incorrect_password',
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
        { headers: { cookie: token.bearer } },
      )

      expect(name).toBe('Updated Test User')

      user.name = 'Updated Test User'
      user.password = '987654321'
    })

    it('should not allow an incorrect password', async () => {
      try {
        await axios.put(
          `${uri}/register`,
          {
            password: 'incorrectpassword',
            newPassword: '198237645',
          },
          { headers: { cookie: token.bearer } },
        )
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

      expect(cookies[0]).toMatch(/Bearer=/)
      expect(status).toBe(200)
    })
  })
}
