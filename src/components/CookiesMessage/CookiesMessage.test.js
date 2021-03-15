import { render, screen } from 'setup-tests'
import { MESSAGE } from './constants'
import CookiesMessage from './CookiesMessage'

test('CookiesMessage', () => {
  render(<CookiesMessage onClick={() => {}} />)

  expect(screen.getByText(MESSAGE))
})
