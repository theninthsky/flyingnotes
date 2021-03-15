import { render, screen } from 'setup-tests'
import List from './List'

const TITLE = 'Title'
const ITEMS = [
  { checked: true, value: 'item1' },
  { checked: true, value: 'item2' },
  { checked: true, value: 'item3' }
]
const DATE = new Date().toISOString()

test('List', () => {
  render(<List title={TITLE} items={ITEMS} date={DATE} />)

  expect(screen.getByDisplayValue(TITLE))
  expect(screen.getByText(new Date(DATE).toLocaleString('en-GB').replace(',', '').slice(0, -3)))

  ITEMS.forEach(({ value }) => expect(screen.getByDisplayValue(value)))
})
