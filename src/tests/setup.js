import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render } from '@testing-library/react'

import './mocks'

const AllTheProviders = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>
}

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'

export { customRender as render }
