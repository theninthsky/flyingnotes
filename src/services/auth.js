const { SERVER_URL } = process.env

export const registerService = payload =>
  fetch(`${SERVER_URL}/register`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

export const loginService = payload =>
  fetch(`${SERVER_URL}/login`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
