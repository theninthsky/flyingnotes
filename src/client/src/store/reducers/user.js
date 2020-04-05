import * as actionTypes from '../actions/actionTypes'

const initialState = {
  name: localStorage.name,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_NAME:
      return { name: action.name }
    case actionTypes.LOGOUT:
      return {}
    default:
      return state
  }
}
