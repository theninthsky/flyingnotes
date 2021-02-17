import { any, func } from 'prop-types'

import { Wrapper } from './style'

const UpdateAlert = ({ children, onClick }) => {
  return <Wrapper onClick={onClick}>{children}</Wrapper>
}

UpdateAlert.propTypes = {
  children: any,
  onClick: func
}

export default UpdateAlert
