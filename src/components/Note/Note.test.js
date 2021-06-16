import { render, screen } from 'tests/setup'
import Note from './Note'

const CATEGORY = 'Category'
const TITLE = 'Title'
const CONTENT = 'Content...'
const DATE = new Date().toISOString()

test('Note', () => {
  render(<Note category={CATEGORY} title={TITLE} content={CONTENT} date={DATE} />)

  expect(screen.getByDisplayValue(CATEGORY))
  expect(screen.getByDisplayValue(TITLE))
  expect(screen.getByDisplayValue(CONTENT))
  expect(screen.getByText(new Date(DATE).toLocaleString('en-GB').replace(',', '').slice(0, -3)))
})
