import { useEffect, useState } from 'react'

// Keeps a piece of state in sync with localStorage so data survives a refresh.
const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      if (!stored) return initialValue

      const parsed = JSON.parse(stored)
      if (Array.isArray(initialValue) && !Array.isArray(parsed)) return initialValue
      return parsed
    } catch (err) {
      console.log('Could not read localStorage key ' + key, err)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.log('Could not write localStorage key ' + key, err)
    }
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage
