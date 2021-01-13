import { MESSAGE } from './constants'
import { Wrapper } from './style'

const CookiesMessage = ({ toggle }) => {
  return <Wrapper onClick={() => toggle(false)}>{MESSAGE}</Wrapper>
}

export default CookiesMessage
