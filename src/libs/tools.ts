import { useHistory } from 'react-router-dom'

export const getLocalStorage = (key: string) => localStorage.getItem(key)

export const setLocalStorage = (key: string, value: string) =>
  localStorage.setItem(key, value)

export const removeLocalStorage = (key: string) => localStorage.removeItem(key)

export const getURLQuery = () => {
  const history = useHistory()
  if (!history.location.search) return ''
  try {
    const id = history.location.search.slice(1).split('=')[1]
    if (!id) return ''
    return id
  } catch {
    return ''
  }
}
