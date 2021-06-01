const { SERVER_URL } = process.env

export const renewTokenService = () =>
  fetch(`${SERVER_URL}/renew-token`, {
    credentials: 'include',
    headers: { Authorization: `Bearer=${localStorage.token}` }
  })
