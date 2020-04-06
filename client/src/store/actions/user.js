import * as actionTypes from './actionTypes'

export const register = credentials => ({
  type: actionTypes.REGISTER,
  credentials,
})

export const login = credentials => ({
  type: actionTypes.LOGIN,
  credentials,
})

export const update = credentials => ({
  type: actionTypes.UPDATE_USER,
  credentials,
})

export const setName = name => ({ type: actionTypes.SET_NAME, name })

export const requestLogout = () => ({ type: actionTypes.REQUEST_LOGOUT })
export const logout = () => ({ type: actionTypes.LOGOUT })
