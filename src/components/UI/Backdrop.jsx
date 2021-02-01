import styled from 'styled-components'

const StyledBackdrop = styled.div`
  z-index: 2;
  position: absolute;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(14px);
`

const Backdrop = ({ onClick }) => {
  return <StyledBackdrop onClick={onClick} />
}

export default Backdrop
