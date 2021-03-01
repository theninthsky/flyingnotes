import { func } from 'prop-types'

import { MESSAGE } from './constants'
import { Wrapper } from './style'

const CookiesMessage = ({ onClick }) => {
  return <Wrapper onClick={onClick}>{MESSAGE}</Wrapper>
}

CookiesMessage.propTypes = {
  onClick: func.isRequired
}

export default CookiesMessage
