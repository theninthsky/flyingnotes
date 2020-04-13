import chai from 'chai'

import agent from '../agent.js'
import { user } from '../dummy-user.js'

const { expect } = chai

describe('Default Route', function () {
  it('should respond with an html file and a 200 status code', async function () {
    const res = await agent.get('/')

    expect(res).to.be.html
    expect(res).to.have.status(200)
  })
})

describe('Register', function () {
  it('should create and save a user', async function () {
    const res = await agent.post('/register').send(user)

    expect(res).to.have.cookie('connect.sid')
    expect(res.body.name).to.equal(user.name)

    for (const note of res.body.notes) {
      expect(note).to.deep.include(user.notes[res.body.notes.indexOf(note)])
    }
  })

  it('should not allow creating a duplicate user', async function () {
    const res = await agent.post('/register').send(user)

    expect(res).to.have.status(409)
    expect(res.text).to.equal(
      'This email address is already registered, try login instead',
    )
  })
})

describe('Login', function () {
  it('should login and return the name and notes', async function () {
    const res = await agent.post('/login').send(user)

    expect(res.body.name).to.equal(user.name)

    for (const note of res.body.notes) {
      expect(note).to.deep.include(user.notes[res.body.notes.indexOf(note)])
    }
  })

  it('should not allow an incorrect email or password', async function () {
    const res = await agent.post('/login').send({
      ...user,
      password: 'incorrect_password',
    })

    expect(res.text).to.equal('Incorrect email or password')
  })
})

describe('Update', function () {
  it('should update the name and password', async function () {
    const res = await agent.put('/register').send({
      name: 'Updated Test User',
      password: user.password,
      newPassword: '987654321',
    })

    expect(res.body.name).to.equal('Updated Test User')

    user.password = '987654321'
  })

  it('should not allow an incorrect password', async function () {
    const res = await agent.put('/register').send({
      password: 'incorrectpassword',
      newPassword: '198237645',
    })

    expect(res.text).to.equal('Incorrect password')
  })
})

describe('Logout', function () {
  it('should remove the bearer token', async function () {
    const res = await agent.post('/logout')

    expect(res).to.have.header('set-cookie', /connect.sid=;/)
    expect(res).to.have.status(200)
  })
})
