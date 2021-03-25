import { RecoilRoot } from 'recoil'

import List from './List'

export default {
  title: 'List',
  component: List,
  argTypes: {}
}

const Template = args => (
  <RecoilRoot>
    <List {...args} />
  </RecoilRoot>
)

export const Primary = Template.bind({})

Primary.args = {
  title: 'Demo',
  items: [
    { checked: false, value: 'Item 1' },
    { checked: false, value: 'Item 2' },
    { checked: true, value: 'Item 3' }
  ],
  date: new Date()
}

export const New = Template.bind({})

New.args = {
  newList: true,
  items: [{}]
}
