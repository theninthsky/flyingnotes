import { any } from 'prop-types'

const If = ({ condition, children: component }) => (condition ? component : null)

If.propTypes = {
  condition: any,
  children: any.isRequired
}

export default If
