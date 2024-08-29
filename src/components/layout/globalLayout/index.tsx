import React, { type ReactNode, type FunctionComponent } from 'react'
import './styles.css'

export const GlobalLayout: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  return <>{children}</>
}
