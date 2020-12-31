import { Wrapper } from './style'

const CookiesMessage = ({ toggle }) => {
  return (
    <Wrapper onClick={() => toggle(false)}>
      Notes are saved as cookies and will be lost if you clear the browser's data. Login to have your notes and files
      saved on the cloud.
    </Wrapper>
  )
}

export default CookiesMessage
