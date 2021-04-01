import List from './List'

export default {
  title: 'List',
  component: List,
  argTypes: {}
}

const Template = args => <List {...args} />

export const Normal = Template.bind({})

Normal.args = {
  title: 'Demo',
  items: [
    { checked: false, value: 'Item 1' },
    { checked: false, value: 'Item 2' },
    { checked: true, value: 'Item 3' }
  ],
  date: new Date().toISOString()
}

export const New = Template.bind({})

New.args = {
  newList: true,
  items: [{}]
}
