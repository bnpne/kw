import { useEffect, useRef } from 'react'

export const useRefMounted = () => {
  const mounted = useRef(false)
  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  })
  return mounted
}
