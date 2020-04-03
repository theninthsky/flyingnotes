import axios from 'axios'

import { uri } from './data'

import userTests from './suites/user'
import notesTests from './suites/notes'
import filesTests from './suites/files'

const { WATCH } = process.env

describe('User Tests', () => userTests())

describe('Notes Tests', () => notesTests())

describe('Files Tests', () => filesTests())

afterAll(() => {
  if (!WATCH) {
    axios(`${uri}/kill`)
  }
})
