import { useEffect, useState } from 'react'
import { fetchMenuItems } from '../api/client'

function normalizeMenuItem(item) {
  const categoryName = String(item.category ?? '').toLowerCase()
  const tags = Array.isArray(item.tags) ? item.tags : []

  return {
    ...item,
    category: categoryName.includes('coffee') || categoryName.includes('drink')
      ? 'drinks'
      : categoryName.includes('pastry') || categoryName.includes('food')
        ? 'food'
        : categoryName,
    tags,
    dietary: Array.isArray(item.dietary) ? item.dietary : [],
    isPopular: Boolean(item.isPopular) || tags.some((tag) => /popular|bestseller/i.test(tag)),
    isNew: Boolean(item.isNew) || tags.some((tag) => /new/i.test(tag)),
  }
}

export function useMenuItems() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    fetchMenuItems()
      .then((data) => {
        if (active) setItems(Array.isArray(data) ? data.map(normalizeMenuItem) : [])
      })
      .catch((requestError) => {
        if (active) setError(requestError.message)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  return { items, loading, error }
}