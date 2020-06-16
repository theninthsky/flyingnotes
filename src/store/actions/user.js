import { REGISTER, LOGIN, UPDATE, CHANGE_PASSWORD, LOGOUT, SET_NAME } from './constants'

export const register = credentials => ({
  type: REGISTER,
  credentials,
})

export const login = credentials => ({
  type: LOGIN,
  credentials,
})

export const update = name => ({
  type: UPDATE,
  name,
})

export const changePassword = passwords => ({
  type: CHANGE_PASSWORD,
  passwords,
})

export const logout = () => ({ type: LOGOUT })

export const setName = name => ({ type: SET_NAME, name })
