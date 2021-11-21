import { render, screen } from 'tests/setup'
import Note from './Note'

const CATEGORY = 'Category'
const TITLE = 'Title'
const CONTENT = 'Content...'
const ITEMS = [
  { checked: true, value: 'item1' },
  { checked: true, value: 'item2' },
  { checked: true, value: 'item3' }
]
const DATE = new Date().toISOString()

test('Note', () => {
  render(<Note variant="note" category={CATEGORY} title={TITLE} content={CONTENT} date={DATE} />)

  expect(screen.getByDisplayValue(CATEGORY))
  expect(screen.getByDisplayValue(TITLE))
  expect(screen.getByDisplayValue(CONTENT))
  expect(screen.getByText(new Date(DATE).toLocaleString('en-GB').replace(',', '').slice(0, -3)))
})

test('List', () => {
  render(<Note variant="list" title={TITLE} items={ITEMS} date={DATE} />)

  expect(screen.getByDisplayValue(TITLE))
  expect(screen.getByText(new Date(DATE).toLocaleString('en-GB').replace(',', '').slice(0, -3)))

  ITEMS.forEach(({ value }) => expect(screen.getByDisplayValue(value)))
})
