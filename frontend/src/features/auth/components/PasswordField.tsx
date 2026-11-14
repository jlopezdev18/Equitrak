import { useState } from 'react'
import FormField, { type FormFieldProps } from './FormField.tsx'
import Icon from './Icon.tsx'

type PasswordFieldProps = Omit<FormFieldProps, 'icon' | 'type' | 'className' | 'children'> & {
  revealLabel?: string
}

export default function PasswordField({ revealLabel = 'contraseña', ...props }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false)

  return (
    <FormField {...props} icon="lock" className="has-reveal" type={visible ? 'text' : 'password'}>
      <button className="reveal" type="button" aria-pressed={visible}
        aria-label={`${visible ? 'Ocultar' : 'Mostrar'} ${revealLabel}`}
        onClick={() => setVisible((current) => !current)}>
        <Icon name="eye" />
      </button>
    </FormField>
  )
}
