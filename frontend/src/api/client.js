const API_BASE = import.meta.env.VITE_API_URL || '/api'

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  let data = null
  const text = await response.text()
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = { detail: text }
    }
  }

  if (!response.ok) {
    const message =
      data?.detail ||
      Object.values(data ?? {})
        .flat()
        .join(' ') ||
      `Request failed (${response.status})`
    throw new Error(message)
  }

  return data
}

export function fetchMenuItems() {
  return request('/menu/')
}

export function createOrder(payload) {
  return request('/orders/', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function fetchOrderHistory(phone) {
  const params = new URLSearchParams({ phone })
  return request(`/orders/?${params}`)
}

export function submitContactMessage(payload) {
  return request('/contact/', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
