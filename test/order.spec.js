import axios from 'axios'

const { uri } = require('./data')

const { userTests } = require('./suites/user')
const { notesTests } = require('./suites/notes')
const { filesTests } = require('./suites/files')

const { WATCH } = process.env

describe('User Tests', () => userTests())

describe('Notes Tests', () => notesTests())

describe('Files Tests', () => filesTests())

afterAll(() => {
  if (!WATCH) {
    axios(`${uri}/kill`)
  }
})
