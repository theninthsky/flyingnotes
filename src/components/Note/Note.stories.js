import Note from './Note'

export default {
  title: 'Note',
  component: Note,
  argTypes: {}
}

const Template = args => <Note {...args} />

export const Primary = Template.bind({})

Primary.args = {
  category: 'example',
  title: 'Demo',
  content: 'Lorem ipsum dolor sit amet...',
  date: new Date().toISOString()
}

export const New = Template.bind({})

New.args = {
  newNote: true
}
