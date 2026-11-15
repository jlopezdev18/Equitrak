import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App.tsx'

beforeEach(() => {
  window.history.replaceState(null, '', '/')
})

afterEach(() => {
  vi.restoreAllMocks()
})

type TestUser = ReturnType<typeof userEvent.setup>

interface RegistrationInput {
  name: string
  email: string
  phone: string
  password: string
  confirmation: string
  terms: boolean
}

async function openRegistration() {
  const user = userEvent.setup()
  render(<App />)
  await user.click(screen.getByRole('link', { name: 'Regístrese aquí' }))
  return user
}

async function fillRegistration(user: TestUser, overrides: Partial<RegistrationInput> = {}) {
  const values: RegistrationInput = {
    name: 'Ana López',
    email: 'ana@gmail.com',
    phone: '9999-0000',
    password: 'prueba123',
    confirmation: 'prueba123',
    terms: true,
    ...overrides,
  }
  for (const [key, label] of [
    ['name', 'Nombre y apellido'],
    ['email', 'Correo electrónico'],
    ['phone', 'Teléfono de contacto'],
    ['password', 'Contraseña'],
    ['confirmation', 'Confirmar contraseña'],
  ] as const) {
    if (values[key]) await user.type(screen.getByLabelText(label, { exact: true }), values[key])
  }
  if (values.terms) await user.click(screen.getByRole('checkbox', { name: /Acepto/ }))
}

async function submitRegistration(user: TestUser) {
  await user.click(screen.getByRole('button', { name: 'Crear cuenta' }))
}

describe('UI de autenticación', () => {
  it('UI-01: muestra login con el enlace inferior y los controles iniciales', () => {
    render(<App />)
    expect(screen.getByRole('form', { name: 'Iniciar sesión' })).toBeInTheDocument()
    expect(screen.getByLabelText('Correo electrónico')).toHaveAttribute('type', 'email')
    expect(screen.getByLabelText('Contraseña', { exact: true })).toHaveAttribute('type', 'password')
    expect(screen.getByRole('checkbox', { name: 'Recordarme' })).not.toBeChecked()
    expect(screen.getByRole('link', { name: 'Regístrese aquí' })).toHaveAttribute(
      'href',
      '#registro',
    )
    expect(screen.queryByRole('tablist')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Crear cuenta' })).not.toBeInTheDocument()
  })

  it('UI-02: muestra los cinco campos de registro en el orden definido', async () => {
    await openRegistration()
    const fields = screen.getAllByRole<HTMLInputElement>('textbox')
    expect(fields.map((field) => field.labels?.[0]?.textContent)).toEqual([
      'Nombre y apellido',
      'Correo electrónico',
      'Teléfono de contacto',
    ])
    const form = screen.getByRole('form', { name: 'Crear cuenta' })
    expect(
      [...form.querySelectorAll<HTMLInputElement>('input:not([type="checkbox"])')].map(
        (field) => field.labels?.[0]?.textContent,
      ),
    ).toEqual([
      'Nombre y apellido',
      'Correo electrónico',
      'Teléfono de contacto',
      'Contraseña',
      'Confirmar contraseña',
    ])
    expect(screen.queryByLabelText(/empresa/i)).not.toBeInTheDocument()
    expect(screen.getByLabelText('Contraseña', { exact: true })).toHaveAttribute('type', 'password')
    expect(screen.getByLabelText('Confirmar contraseña')).toHaveAttribute('type', 'password')
    expect(screen.getByRole('checkbox', { name: /Acepto/ })).not.toBeChecked()
    expect(screen.queryByRole('tablist')).not.toBeInTheDocument()
  })

  it('UI-03: navega por los enlaces inferiores, limpia errores y enfoca el primer campo', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Iniciar sesión' }))
    await user.click(screen.getByRole('link', { name: 'Regístrese aquí' }))
    expect(screen.getByLabelText('Nombre y apellido')).toHaveFocus()
    expect(screen.getByRole('status')).toBeEmptyDOMElement()
    expect(screen.queryByRole('form', { name: 'Iniciar sesión' })).not.toBeInTheDocument()
    await user.click(screen.getByRole('link', { name: 'Inicie sesión aquí' }))
    expect(screen.getByLabelText('Correo electrónico')).toHaveFocus()
    expect(screen.getByRole('status')).toBeEmptyDOMElement()
  })

  it.each([
    ['login', 'Contraseña', 'Mostrar contraseña', 'Ocultar contraseña'],
    ['registro', 'Contraseña', 'Mostrar contraseña', 'Ocultar contraseña'],
    [
      'registro',
      'Confirmar contraseña',
      'Mostrar confirmación de contraseña',
      'Ocultar confirmación de contraseña',
    ],
  ])(
    'UI-04: alterna la visibilidad de %s / %s sin perder el valor',
    async (view, label, show, hide) => {
      const user = view === 'registro' ? await openRegistration() : userEvent.setup()
      if (view === 'login') render(<App />)
      const field = screen.getByLabelText(label, { exact: true })
      await user.type(field, 'clave123')
      await user.click(screen.getByRole('button', { name: show }))
      expect(field).toHaveAttribute('type', 'text')
      expect(field).toHaveValue('clave123')
      expect(screen.getByRole('button', { name: hide })).toHaveAttribute('aria-pressed', 'true')
      if (view === 'registro') {
        const other = label === 'Contraseña' ? 'Confirmar contraseña' : 'Contraseña'
        expect(screen.getByLabelText(other, { exact: true })).toHaveAttribute('type', 'password')
      }
      await user.click(screen.getByRole('button', { name: hide }))
      expect(field).toHaveAttribute('type', 'password')
      expect(screen.getByRole('button', { name: show })).toHaveAttribute('aria-pressed', 'false')
      expect(screen.getByRole('status')).toBeEmptyDOMElement()
    },
  )

  it('UI-05: permite recorrer y enviar login con teclado y enfoca el primer error', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.tab()
    const email = screen.getByLabelText('Correo electrónico')
    expect(email).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(email).toHaveFocus()
    expect(email).toHaveAttribute('aria-invalid', 'true')
    expect(email).toHaveAccessibleDescription('Por favor, ingrese un correo electrónico válido.')
    await user.type(email, 'ana@gmail.com')
    await user.tab()
    expect(screen.getByLabelText('Contraseña', { exact: true })).toHaveFocus()
    await user.keyboard('clave123{Enter}')
    expect(screen.getByRole('status')).toHaveTextContent(/Vista previa/)
  })

  it.each([
    ['name', '', 'Nombre y apellido'],
    ['name', '   ', 'Nombre y apellido'],
    ['email', '', 'Correo electrónico'],
    ['phone', '', 'Teléfono de contacto'],
    ['phone', '   ', 'Teléfono de contacto'],
    ['password', '', 'Contraseña'],
    ['confirmation', '', 'Confirmar contraseña'],
  ])('UI-06: valida el campo obligatorio %s con valor %j', async (key, value, label) => {
    const user = await openRegistration()
    await fillRegistration(user, { [key]: value })
    await submitRegistration(user)
    expect(screen.getByLabelText(label, { exact: true })).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByLabelText(label, { exact: true })).toHaveFocus()
    expect(screen.getByRole('status')).not.toHaveTextContent(/validado/)
  })

  it.each(['login', 'registro'])('UI-07: rechaza correo inválido en %s', async (view) => {
    const user = view === 'registro' ? await openRegistration() : userEvent.setup()
    if (view === 'login') render(<App />)
    await user.type(screen.getByLabelText('Correo electrónico'), 'correo-invalido')
    if (view === 'registro')
      await user.type(screen.getByLabelText('Nombre y apellido'), 'Ana López')
    await user.click(
      screen.getByRole('button', { name: view === 'registro' ? 'Crear cuenta' : 'Iniciar sesión' }),
    )
    expect(screen.getByLabelText('Correo electrónico')).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByRole('status')).toHaveTextContent(/correo electrónico válido/)
  })

  it.each([
    ['1234567', false],
    ['12345678', true],
    [' 123456 ', true],
  ] as const)('UI-08: valida la longitud de contraseña preservando %j', async (password, valid) => {
    const user = await openRegistration()
    await fillRegistration(user, { password, confirmation: password })
    await submitRegistration(user)
    const field = screen.getByLabelText('Contraseña', { exact: true })
    expect(field).toHaveValue(password)
    if (valid) expect(screen.getByRole('status')).toHaveTextContent(/Vista previa.*validado/)
    else {
      expect(field).toHaveAttribute('aria-invalid', 'true')
      expect(screen.getByRole('status')).toHaveTextContent(/al menos 8 caracteres/)
    }
  })

  it.each([
    [{ confirmation: 'diferente123' }, /contraseñas no coinciden/],
    [{ terms: false }, /aceptar los Términos/],
  ] as const)(
    'UI-09: rechaza confirmación o aceptación incorrecta: %j',
    async (overrides, message) => {
      const user = await openRegistration()
      await fillRegistration(user, overrides)
      await submitRegistration(user)
      expect(screen.getByRole('status')).toHaveTextContent(message)
      if ('terms' in overrides && overrides.terms === false)
        expect(screen.getByRole('checkbox', { name: /Acepto/ })).toHaveFocus()
    },
  )

  it.each([
    ['', 'clave123', 'Correo electrónico'],
    ['ana@gmail.com', '', 'Contraseña'],
  ])('UI-10: exige correo y contraseña en login (%s / %s)', async (email, password, label) => {
    const user = userEvent.setup()
    render(<App />)
    if (email) await user.type(screen.getByLabelText('Correo electrónico'), email)
    if (password) await user.type(screen.getByLabelText('Contraseña', { exact: true }), password)
    await user.click(screen.getByRole('button', { name: 'Iniciar sesión' }))
    expect(screen.getByLabelText(label, { exact: true })).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByLabelText(label, { exact: true })).toHaveFocus()
  })

  it.each([
    ['', false],
    ['123456', false],
    [' 1234567 ', true],
  ] as const)('UI-11: valida el teléfono %j', async (phone, valid) => {
    const user = await openRegistration()
    await fillRegistration(user, { phone })
    await submitRegistration(user)
    if (valid) expect(screen.getByRole('status')).toHaveTextContent(/Vista previa.*validado/)
    else
      expect(screen.getByLabelText('Teléfono de contacto')).toHaveAttribute('aria-invalid', 'true')
  })

  it('UI-12: valida login localmente y mantiene la vista y la contraseña', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByLabelText('Correo electrónico'), 'ana@gmail.com')
    await user.type(screen.getByLabelText('Contraseña', { exact: true }), ' clave123 ')
    await user.click(screen.getByRole('button', { name: 'Iniciar sesión' }))
    expect(screen.getByRole('status')).toHaveTextContent(/Vista previa.*inicio de sesión.*validado/)
    expect(screen.getByRole('form', { name: 'Iniciar sesión' })).toBeInTheDocument()
    expect(screen.getByLabelText('Contraseña', { exact: true })).toHaveValue(' clave123 ')
    expect(window.location.hash).toBe('')
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('UI-13: valida registro localmente con correo personal y conserva la vista', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    const user = await openRegistration()
    await fillRegistration(user)
    await submitRegistration(user)
    expect(screen.getByRole('status')).toHaveTextContent(/Vista previa.*registro validado/)
    expect(screen.getByRole('form', { name: 'Crear cuenta' })).toBeInTheDocument()
    expect(screen.getByLabelText('Correo electrónico')).toHaveValue('ana@gmail.com')
    expect(window.location.hash).toBe('#registro')
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it.each(['login', 'registro'])('UI-14: limpia el feedback al editar %s', async (view) => {
    const user = view === 'registro' ? await openRegistration() : userEvent.setup()
    if (view === 'login') render(<App />)
    await user.click(
      screen.getByRole('button', { name: view === 'registro' ? 'Crear cuenta' : 'Iniciar sesión' }),
    )
    const field = screen.getByLabelText(
      view === 'registro' ? 'Nombre y apellido' : 'Correo electrónico',
    )
    expect(field).toHaveAttribute('aria-invalid', 'true')
    await user.type(field, 'a')
    expect(field).not.toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByRole('status')).toBeEmptyDOMElement()
  })

  it('UI-15: permite cambiar Recordarme sin alterar los campos', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByLabelText('Correo electrónico'), 'ana@gmail.com')
    await user.type(screen.getByLabelText('Contraseña', { exact: true }), 'clave123')
    const remember = screen.getByRole('checkbox', { name: 'Recordarme' })
    expect(remember).not.toBeChecked()
    await user.click(remember)
    expect(remember).toBeChecked()
    await user.click(remember)
    expect(remember).not.toBeChecked()
    expect(screen.getByLabelText('Correo electrónico')).toHaveValue('ana@gmail.com')
    expect(screen.getByLabelText('Contraseña', { exact: true })).toHaveValue('clave123')
  })

  it.each([
    ['login', 'button', '¿Olvidó su contraseña?', /Vista previa.*recuperación/],
    ['registro', 'link', 'Términos del servicio', /Vista previa.*Términos/],
    ['registro', 'link', 'Política de privacidad', /Vista previa.*Política/],
  ])('UI-16: muestra el aviso de %s / %s / %s', async (view, role, name, message) => {
    const user = view === 'registro' ? await openRegistration() : userEvent.setup()
    if (view === 'login') render(<App />)
    await user.click(screen.getByRole(role, { name }))
    expect(screen.getByRole('status')).toHaveTextContent(message)
    expect(
      screen.getByRole('form', { name: view === 'registro' ? 'Crear cuenta' : 'Iniciar sesión' }),
    ).toBeInTheDocument()
  })

  it.each(['#registro', '#register'])('abre directamente el registro con %s', (hash) => {
    window.history.replaceState(null, '', hash)
    render(<App />)
    expect(screen.getByRole('form', { name: 'Crear cuenta' })).toBeInTheDocument()
  })

  it('sincroniza la vista al cambiar el fragmento de navegación', () => {
    render(<App />)
    act(() => {
      window.history.replaceState(null, '', '#registro')
      window.dispatchEvent(new HashChangeEvent('hashchange'))
    })
    expect(screen.getByRole('form', { name: 'Crear cuenta' })).toBeInTheDocument()
    expect(screen.getByLabelText('Nombre y apellido')).toHaveFocus()
    act(() => {
      window.history.replaceState(null, '', '/')
      window.dispatchEvent(new PopStateEvent('popstate'))
    })
    expect(screen.getByRole('form', { name: 'Iniciar sesión' })).toBeInTheDocument()
    expect(screen.getByLabelText('Correo electrónico')).toHaveFocus()
  })
})
