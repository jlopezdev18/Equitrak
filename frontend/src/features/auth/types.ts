import type { MouseEvent } from 'react'

export type AuthMode = 'login' | 'register'

export interface FormNavigationProps {
  onNavigate: (event: MouseEvent<HTMLAnchorElement>, mode: AuthMode) => void
  autoFocus?: boolean
}

export interface PreviewFeedback {
  type: 'success' | 'info' | 'error'
  message: string
}

export interface LoginValues {
  email: string
  password: string
  remember: boolean
}

export interface RegisterValues {
  name: string
  email: string
  phone: string
  password: string
  passwordConfirm: string
  terms: boolean
}
