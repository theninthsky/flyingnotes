import { render, screen } from 'setup-tests'
import File from './File'

const NAME = 'Filename'
const EXTENSION = 'png'

describe('File', () => {
  it('should render', () => {
    render(<File id="" name={NAME} extension={EXTENSION} />)

    expect(screen.getByDisplayValue(NAME)).toBeDefined()
    expect(screen.getByText(EXTENSION)).toBeDefined()
  })
})
