import type { ComponentPropsWithRef } from 'react'
import Icon, { type IconName } from './Icon.tsx'

export interface FormFieldProps extends ComponentPropsWithRef<'input'> {
  id: string
  label: string
  icon: IconName
  error?: string
}

export default function FormField({ id, label, icon, error, children, ...inputProps }: FormFieldProps) {
  const errorId = `${id}-error`

  return (
    <div className="field">
      <label className="form-label" htmlFor={id}>{label}</label>
      <div className="field-inner">
        <Icon name={icon} className="field-icon" />
        <input {...inputProps} id={id} aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? errorId : undefined} />
        {children}
      </div>
      {error ? <span id={errorId} className="field-error">{error}</span> : null}
    </div>
  )
}
