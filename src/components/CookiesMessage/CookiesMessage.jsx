import { func } from 'prop-types'

import { MESSAGE } from './constants'
import { Wrapper } from './style'

const CookiesMessage = ({ toggle }) => {
  return <Wrapper onClick={() => toggle(false)}>{MESSAGE}</Wrapper>
}

CookiesMessage.propTypes = {
  toggle: func.isRequired
}

export default CookiesMessage
