import { render, screen } from 'setup-tests'
import File from './File'

const NAME = 'Filename'
const EXTENSION = 'png'

test('File', () => {
  render(<File name={NAME} extension={EXTENSION} />)

  expect(screen.getByDisplayValue(NAME))
  expect(screen.getByText(EXTENSION))
})
