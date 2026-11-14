import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App.jsx'

describe('App', () => {
  it('muestra la pantalla inicial y el contador en cero', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 1, name: 'Get started' }))
      .toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Count is 0' }))
      .toBeInTheDocument()
  })

  it('incrementa el contador con cada clic', async () => {
    const user = userEvent.setup()
    render(<App />)

    const counter = screen.getByRole('button', { name: 'Count is 0' })

    await user.click(counter)
    expect(counter).toHaveAccessibleName('Count is 1')

    await user.click(counter)
    expect(counter).toHaveAccessibleName('Count is 2')
  })
})
