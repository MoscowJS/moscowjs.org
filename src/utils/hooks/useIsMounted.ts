import React, { useCallback, useEffect, useRef } from "react"

export const useIsMounted = () => {
  const ref = useRef(true)
  useEffect(
    () => () => {
      ref.current = false
    },
    []
  )
  return ref
}
