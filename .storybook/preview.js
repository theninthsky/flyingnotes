import { GlobalStyle } from '../src/components/App/style'

export const decorators = [
  Story => (
    <>
      <GlobalStyle />
      <Story />
    </>
  )
]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' }
}
