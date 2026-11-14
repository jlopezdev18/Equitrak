const emailMessage = 'Por favor, ingrese un correo electrónico válido.'
const phoneMessage = 'Por favor, ingrese un número de teléfono válido.'

export const emailRules = {
  required: emailMessage,
  validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) || emailMessage,
}

export const phoneRules = {
  required: phoneMessage,
  validate: (value: string) => value.trim().length >= 7 || phoneMessage,
}
