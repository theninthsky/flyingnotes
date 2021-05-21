import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { render } from '@testing-library/react'

import 'test-mocks'

const AllTheProviders = ({ children }) => {
  return (
    <RecoilRoot>
      <Router>{children}</Router>
    </RecoilRoot>
  )
}

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'

export { customRender as render }
