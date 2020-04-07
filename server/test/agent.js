import chai from 'chai'
import chaiHTTP from 'chai-http'

import app from '../src/app.js'

chai.use(chaiHTTP)

export default chai.request.agent(app)
