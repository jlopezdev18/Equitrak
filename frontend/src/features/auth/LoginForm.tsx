import { useState, type MouseEvent } from 'react'
import { useForm } from 'react-hook-form'
import FormField from './components/FormField.tsx'
import PasswordField from './components/PasswordField.tsx'
import FormFeedback from './components/FormFeedback.tsx'
import Icon from './components/Icon.tsx'
import { emailRules } from './validation.ts'
import type { FormNavigationProps, LoginValues, PreviewFeedback } from './types.ts'

export default function LoginForm({ onNavigate, autoFocus }: FormNavigationProps) {
  const { register, handleSubmit, clearErrors, formState: { errors } } = useForm<LoginValues>({
    defaultValues: { email: '', password: '', remember: false },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  })
  const [preview, setPreview] = useState<PreviewFeedback | null>(null)
  const errorMessage = errors.email?.message ?? errors.password?.message
  const feedback: PreviewFeedback | null = errorMessage
    ? { type: 'error', message: errorMessage }
    : preview
  const feedbackId = 'login-feedback'

  function clearFeedback() {
    if (Object.keys(errors).length) clearErrors()
    if (preview) setPreview(null)
  }

  function showRecovery(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    clearErrors()
    setPreview({ type: 'info', message: 'Vista previa de recuperación de contraseña.' })
  }

  return (
    <form className="form" id="sign-in" aria-label="Iniciar sesión" noValidate
      onSubmit={handleSubmit(() => setPreview({ type: 'success', message: 'Vista previa: formulario de inicio de sesión validado.' }))}
      onChange={clearFeedback}>
      <FormField id="email" label="Correo electrónico" icon="mail" {...register('email', emailRules)}
        type="email" autoComplete="username" inputMode="email" placeholder="Ingrese su correo electrónico"
        required autoFocus={autoFocus} error={errors.email?.message} />
      <PasswordField id="password" label="Contraseña"
        {...register('password', { required: 'Por favor, ingrese su contraseña.' })}
        autoComplete="current-password" placeholder="Ingrese su contraseña" required
        error={errors.password?.message} />
      <div className="options">
        <label className="remember">
          <input type="checkbox" {...register('remember')} />
          <span>Recordarme</span>
        </label>
        <button className="text-link" type="button" onClick={showRecovery}>
          ¿Olvidó su contraseña?
        </button>
      </div>
      <button className="submit" type="submit">Iniciar sesión <Icon name="arrow" /></button>
      <p className="auth-switch">
        ¿No tiene una cuenta?{' '}
        <a className="switch-link" href="#registro" onClick={(event) => onNavigate(event, 'register')}>
          Regístrese aquí
        </a>
      </p>
      <FormFeedback id={feedbackId} feedback={feedback} />
    </form>
  )
}
