import { Wrapper } from './style'

const UpdateAlert = ({ children, onClick }) => {
  return <Wrapper onClick={onClick}>{children}</Wrapper>
}

export default UpdateAlert
