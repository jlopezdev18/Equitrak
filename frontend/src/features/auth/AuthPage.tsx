import { useEffect, useState, type MouseEvent } from 'react'
import AuthLayout from './AuthLayout.tsx'
import LoginForm from './LoginForm.tsx'
import RegisterForm from './RegisterForm.tsx'
import type { AuthMode } from './types.ts'
import './auth.css'

function readMode(): AuthMode {
  return ['#registro', '#register'].includes(window.location.hash) ? 'register' : 'login'
}

export default function AuthPage() {
  const [view, setView] = useState(() => ({ mode: readMode(), focus: false }))

  useEffect(() => {
    document.title =
      view.mode === 'register' ? 'Crear cuenta — Equitrak' : 'Iniciar sesión — Equitrak'
  }, [view.mode])

  useEffect(() => {
    function syncView() {
      const mode = readMode()
      setView((current) => (current.mode === mode ? current : { mode, focus: true }))
    }
    window.addEventListener('hashchange', syncView)
    window.addEventListener('popstate', syncView)
    return () => {
      window.removeEventListener('hashchange', syncView)
      window.removeEventListener('popstate', syncView)
    }
  }, [])

  function navigate(event: MouseEvent<HTMLAnchorElement>, mode: AuthMode) {
    event.preventDefault()
    const url =
      mode === 'register' ? '#registro' : window.location.pathname + window.location.search
    window.history.pushState(null, '', url)
    setView({ mode, focus: true })
  }

  return (
    <AuthLayout>
      {view.mode === 'register' ? (
        <RegisterForm onNavigate={navigate} autoFocus={view.focus} />
      ) : (
        <LoginForm onNavigate={navigate} autoFocus={view.focus} />
      )}
    </AuthLayout>
  )
}
