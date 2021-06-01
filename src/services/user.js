const { SERVER_URL } = process.env

export const changePasswordService = payload =>
  fetch(`${SERVER_URL}/change-password`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer=${localStorage.token}` },
    body: JSON.stringify(payload)
  })

export const logoutService = () => fetch(`${SERVER_URL}/logout`, { method: 'POST' })
