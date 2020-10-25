import { SET_NAME } from '../actions/actionTypes'

const initialState = {
  name: localStorage.name,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NAME:
      return { name: action.name }
    default:
      return state
  }
}

export default userReducer
