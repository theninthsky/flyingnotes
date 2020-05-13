import chai from 'chai'

import agent from '../agent.js'
import { user, updatedFile } from '../mocks.js'

const { expect } = chai

describe('Download', function () {
  it('should send a file', async function () {
    const res = await agent
      .get(`/${user.notes[user.notes.length - 1]._id}/file`)
      .buffer()

    expect(res.body).to.deep.equal(updatedFile.buffer)
  })
})
