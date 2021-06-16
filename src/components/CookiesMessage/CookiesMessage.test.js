import { render, screen } from 'tests/setup'
import { MESSAGE } from './constants'
import CookiesMessage from './CookiesMessage'

test('CookiesMessage', () => {
  render(<CookiesMessage onClick={() => {}} />)

  expect(screen.getByText(MESSAGE))
})
