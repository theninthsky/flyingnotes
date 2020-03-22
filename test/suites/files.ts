import axios from 'axios'

import { uri, session, user } from '../data'

export default () => {
  describe('Download', () => {
    it('should send a file', async () => {
      const { data } = await axios.get(`${uri}/${user.notes[2]._id}/file`, {
        headers: { cookie: session.id },
        responseType: 'blob',
      })

      expect(data).toMatch('This is an another dummy text file')
    })
  })
}
