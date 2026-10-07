import { createContext } from 'react'

export const CartContext = createContext(null)
export const HISTORY_KEY = 'brew-bean-order-history'
export const PHONE_KEY = 'brew-bean-customer-phone'

export function loadOrderHistory() {
  try {
    const saved = localStorage.getItem(HISTORY_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}
