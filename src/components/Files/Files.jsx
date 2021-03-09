import { useGetFiles } from 'hooks'
import { File } from 'components'
import { Wrapper } from './style'

const Files = () => {
  const files = useGetFiles()

  return (
    <Wrapper>
      <File newFile />

      {files.map(file => (
        <File key={file._id} {...file} />
      ))}
    </Wrapper>
  )
}

export default Files
