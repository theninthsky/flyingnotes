import * as actionTypes from './actionTypes'

export const register = credentials => ({
  type: actionTypes.REGISTER,
  credentials,
})

export const login = credentials => ({
  type: actionTypes.LOGIN,
  credentials,
})

export const update = name => ({
  type: actionTypes.UPDATE,
  name,
})

export const changePassword = passwords => ({
  type: actionTypes.CHANGE_PASSWORD,
  passwords,
})

export const logout = () => ({ type: actionTypes.LOGOUT })

export const setName = name => ({ type: actionTypes.SET_NAME, name })
