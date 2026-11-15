import { useState, type MouseEvent } from 'react'
import { useForm } from 'react-hook-form'
import FormField from './components/FormField.tsx'
import PasswordField from './components/PasswordField.tsx'
import FormFeedback from './components/FormFeedback.tsx'
import Icon from './components/Icon.tsx'
import { emailRules, phoneRules } from './validation.ts'
import type { FormNavigationProps, PreviewFeedback, RegisterValues } from './types.ts'

export default function RegisterForm({ onNavigate, autoFocus }: FormNavigationProps) {
  const {
    register,
    handleSubmit,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm<RegisterValues>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      passwordConfirm: '',
      terms: false,
    },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  })
  const [preview, setPreview] = useState<PreviewFeedback | null>(null)
  const errorMessage =
    errors.name?.message ??
    errors.email?.message ??
    errors.phone?.message ??
    errors.password?.message ??
    errors.passwordConfirm?.message ??
    errors.terms?.message
  const feedback: PreviewFeedback | null = errorMessage
    ? { type: 'error', message: errorMessage }
    : preview
  const feedbackId = 'register-feedback'

  function clearFeedback() {
    if (Object.keys(errors).length) clearErrors()
    if (preview) setPreview(null)
  }

  function showPreview(event: MouseEvent<HTMLAnchorElement>, message: string) {
    event.preventDefault()
    clearErrors()
    setPreview({ type: 'info', message })
  }

  return (
    <form
      className="form"
      id="sign-up"
      aria-label="Crear cuenta"
      noValidate
      onSubmit={handleSubmit(() =>
        setPreview({ type: 'success', message: 'Vista previa: formulario de registro validado.' }),
      )}
      onChange={clearFeedback}
    >
      <div className="fields-grid">
        <FormField
          id="reg-name"
          label="Nombre y apellido"
          icon="user"
          {...register('name', {
            validate: (value) =>
              Boolean(value.trim()) || 'Por favor, ingrese su nombre y apellido.',
          })}
          type="text"
          autoComplete="name"
          placeholder="Ej. Carlos Martínez"
          required
          autoFocus={autoFocus}
          error={errors.name?.message}
        />
        <FormField
          id="reg-email"
          label="Correo electrónico"
          icon="mail"
          {...register('email', emailRules)}
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="correo@ejemplo.com"
          required
          error={errors.email?.message}
        />
        <FormField
          id="reg-phone"
          label="Teléfono de contacto"
          icon="phone"
          {...register('phone', phoneRules)}
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="+504 9999-0000"
          required
          error={errors.phone?.message}
        />
        <PasswordField
          id="reg-password"
          label="Contraseña"
          {...register('password', {
            required: 'Por favor, ingrese su contraseña.',
            minLength: { value: 8, message: 'La contraseña debe tener al menos 8 caracteres.' },
          })}
          autoComplete="new-password"
          placeholder="Mínimo 8 caracteres"
          required
          error={errors.password?.message}
        />
        <PasswordField
          id="reg-password-confirm"
          label="Confirmar contraseña"
          {...register('passwordConfirm', {
            required: 'Por favor, confirme su contraseña.',
            validate: (value) =>
              value === getValues('password') ||
              'Las contraseñas no coinciden. Por favor, verifíquelas.',
          })}
          revealLabel="confirmación de contraseña"
          autoComplete="new-password"
          placeholder="Repita la contraseña"
          required
          error={errors.passwordConfirm?.message}
        />
      </div>
      <label className="terms-check">
        <input
          type="checkbox"
          required
          {...register('terms', {
            required:
              'Debe aceptar los Términos del servicio y la Política de privacidad para continuar.',
          })}
          aria-invalid={Boolean(errors.terms) || undefined}
          aria-describedby={errors.terms ? 'terms-error' : undefined}
        />
        <span>
          Acepto los{' '}
          <a
            href="#terminos"
            onClick={(event) => showPreview(event, 'Vista previa de los Términos del servicio.')}
          >
            Términos del servicio
          </a>{' '}
          y la{' '}
          <a
            href="#privacidad"
            onClick={(event) => showPreview(event, 'Vista previa de la Política de privacidad.')}
          >
            Política de privacidad
          </a>{' '}
          de Equitrak.
        </span>
      </label>
      {errors.terms?.message ? (
        <span id="terms-error" className="field-error">
          {errors.terms.message}
        </span>
      ) : null}
      <button className="submit" type="submit">
        Crear cuenta <Icon name="arrow" />
      </button>
      <p className="auth-switch">
        ¿Ya tiene una cuenta?{' '}
        <a
          className="switch-link"
          href="#iniciar-sesion"
          onClick={(event) => onNavigate(event, 'login')}
        >
          Inicie sesión aquí
        </a>
      </p>
      <FormFeedback id={feedbackId} feedback={feedback} />
    </form>
  )
}
