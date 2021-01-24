import { Wrapper } from './style'

const Alert = ({ children, onClick }) => {
  return <Wrapper onClick={onClick}>{children}</Wrapper>
}

export default Alert
