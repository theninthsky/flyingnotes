import { render, screen } from '@testing-library/react'

import { MESSAGE } from './constants'
import CookiesMessage from './CookiesMessage'

describe('CookiesMessage', () => {
  it('should render with the correct message', () => {
    render(<CookiesMessage />)

    expect(screen.getByText(MESSAGE)).toBeDefined()
  })
})
