import { useContext, useMemo, useState } from 'react'
import { createOrder, fetchOrderHistory } from '../api/client'
import {
  CartContext,
  HISTORY_KEY,
  PHONE_KEY,
  loadOrderHistory,
} from './cartStorage'

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

const normalizeOrder = (order) => {
  if (!order) return null

  const customer = order.customer ?? {}
  const orderMode = order.orderMode ?? 'pickup'
  const items = Array.isArray(order.items) ? order.items : []

  return {
    orderId: order.id ?? order.orderId,
    customerName: customer.name ?? '',
    phone: customer.phone ?? '',
    address: customer.address ?? '',
    total: Number(order.total ?? 0),
    status: order.status ?? 'Completed ✅',
    orderType: orderMode === 'delivery' ? 'delivery' : 'in-store',
    items,
    timestamp: order.placedAt
      ? new Date(order.placedAt).toLocaleString()
      : new Date().toLocaleString(),
  }
}

const getItemLineTotal = (item, options = {}) => {
  const basePrice = Number(item.price ?? item.lineTotal ?? item.finalPrice ?? 0)
  const isDrink =
    item.category === 'drinks' || item.category === 'new-drinks' || item.category === 'drink'

  if (!isDrink) {
    return Number(basePrice.toFixed(2))
  }

  let finalPrice = basePrice
  const selectedSize = options.size ?? item.selectedSize ?? 'Medium'
  const selectedMilk = options.milk ?? item.selectedMilk ?? 'Whole Milk'

  if (selectedSize === 'Large') finalPrice += 40
  if (selectedSize === 'Small') finalPrice -= 20
  if (selectedMilk === 'Oat Milk' || selectedMilk === 'Almond Milk') finalPrice += 30
  if (options.extraShot) finalPrice += 40

  return Number(finalPrice.toFixed(2))
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [orderType, setOrderType] = useState('in-store')
  const [orderHistory, setOrderHistory] = useState(() =>
    loadOrderHistory().map(normalizeOrder).filter(Boolean),
  )
  const [orderLoading, setOrderLoading] = useState(false)
  const [orderError, setOrderError] = useState(null)

  const persistHistory = (next) => {
    const normalized = Array.isArray(next) ? next.map(normalizeOrder).filter(Boolean) : []
    setOrderHistory(normalized)
    localStorage.setItem(HISTORY_KEY, JSON.stringify(normalized))
  }

  const addItem = (item, options = {}) => {
    const selectedSize = options.size ?? item.selectedSize ?? 'Medium'
    const selectedMilk = options.milk ?? item.selectedMilk ?? 'Whole Milk'
    const hasExtraShot = Boolean(options.extraShot)
    const extras = options.extras ?? item.extras ?? []
    const lineTotal = getItemLineTotal(item, { ...options, size: selectedSize, milk: selectedMilk })

    setItems((prev) => {
      const key = `${item.id}-${selectedSize}-${selectedMilk}-${hasExtraShot ? 'extra' : 'no'}-${extras.join(',')}`
      const existing = prev.find((i) => i.cartKey === key)
      if (existing) {
        return prev.map((i) =>
          i.cartKey === key ? { ...i, qty: i.qty + 1, quantity: i.quantity + 1, lineTotal, finalPrice: lineTotal } : i,
        )
      }

      return [
        ...prev,
        {
          ...item,
          cartKey: key,
          qty: 1,
          quantity: 1,
          selectedSize,
          selectedMilk,
          hasExtraShot,
          extras,
          lineTotal,
          finalPrice: lineTotal,
        },
      ]
    })
    setCartOpen(true)
  }

  const updateQty = (cartKey, delta) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.cartKey !== cartKey) return i

          const nextQty = i.qty + delta
          if (nextQty <= 0) return null

          return {
            ...i,
            qty: nextQty,
            quantity: nextQty,
          }
        })
        .filter(Boolean),
    )
  }

  const removeItem = (cartKey) => {
    setItems((prev) => prev.filter((i) => i.cartKey !== cartKey))
  }

  const clearCart = () => setItems([])

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.qty, 0),
    [items],
  )

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + (Number(i.lineTotal ?? i.finalPrice ?? i.price ?? 0) * Number(i.qty ?? i.quantity ?? 1)), 0),
    [items],
  )

  const placeOrder = async (customer, providedMode = orderType) => {
    const normalizedMode = providedMode === 'delivery' ? 'delivery' : 'pickup'
    setOrderLoading(true)
    setOrderError(null)

    try {
      const payload = {
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          image: item.image,
          size: item.selectedSize ?? item.size ?? '',
          milk: item.selectedMilk ?? item.milk,
          extras: item.extras ?? [],
          lineTotal: Number(item.lineTotal ?? item.finalPrice ?? 0),
          qty: item.qty,
        })),
        customer,
        orderMode: normalizedMode,
        total: subtotal,
      }

      const order = await createOrder(payload)
      const orderSummary = normalizeOrder(order)
      const next = [orderSummary, ...orderHistory]
      persistHistory(next)
      localStorage.setItem(PHONE_KEY, customer.phone.trim())
      clearCart()
      return orderSummary
    } catch (error) {
      setOrderError(error.message)
      throw error
    } finally {
      setOrderLoading(false)
    }
  }

  const syncOrderHistory = async (phone) => {
    if (!phone?.trim()) return

    setOrderLoading(true)
    setOrderError(null)

    try {
      const orders = await fetchOrderHistory(phone.trim())
      persistHistory(orders)
      localStorage.setItem(PHONE_KEY, phone.trim())
    } catch (error) {
      setOrderError(error.message)
    } finally {
      setOrderLoading(false)
    }
  }

  const clearHistory = () => {
    setOrderHistory([])
    localStorage.removeItem(HISTORY_KEY)
    localStorage.removeItem(PHONE_KEY)
  }

  const reorder = (order) => {
    if (!order?.items) return

    order.items.forEach((item) => {
      for (let n = 0; n < Number(item.qty ?? 1); n++) {
        addItem(
          {
            id: item.id,
            name: item.name,
            image: item.image,
            price: Number(item.lineTotal ?? item.finalPrice ?? 0),
            category: 'drinks',
            extras: item.extras ?? [],
          },
          {
            size: item.size ?? 'Medium',
            milk: item.milk ?? 'Whole Milk',
            extras: item.extras ?? [],
            extraShot: false,
          },
        )
      }
    })
  }

  const value = {
    items,
    cart: items,
    cartOpen,
    isCartOpen: cartOpen,
    setCartOpen,
    setIsCartOpen: setCartOpen,
    orderHistory,
    orders: orderHistory,
    orderLoading,
    orderError,
    addItem,
    addToCart: addItem,
    updateQty,
    updateQuantity: updateQty,
    removeItem,
    removeFromCart: removeItem,
    clearCart,
    itemCount,
    cartCount: itemCount,
    subtotal,
    cartTotal: subtotal,
    placeOrder,
    syncOrderHistory,
    clearHistory,
    clearOrderHistory: clearHistory,
    reorder,
    reorderItems: reorder,
    orderType,
    setOrderType,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
