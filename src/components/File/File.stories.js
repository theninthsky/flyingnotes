import File from './File'

export default {
  title: 'File',
  component: File,
  argTypes: {}
}

const Template = args => <File {...args} />

export const Primary = Template.bind({})

Primary.args = {
  name: 'File',
  extension: 'txt'
}

export const New = Template.bind({})

New.args = {
  newFile: true
}
