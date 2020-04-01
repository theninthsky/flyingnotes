const axios = require('axios')

const { uri, token, user } = require('../data')

exports.filesTests = () => {
  describe('Download', () => {
    it('should send a file', async () => {
      const { data } = await axios.get(`${uri}/${user.notes[2]._id}/file`, {
        headers: { cookie: token.bearer },
        responseType: 'blob',
      })

      expect(data).toMatch('This is an another dummy text file')
    })
  })
}
