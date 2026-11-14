import type { ReactNode } from 'react'
import heroPhoto from '../../assets/equitrak-hero.jpg'
import Icon from './components/Icon.tsx'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="auth-page">
      <section className="hero" aria-label="Software de alquiler de equipos Equitrak">
        <div className="hero-content">
          <h1>Gestione alquileres<br />de equipos con <span>confianza.</span></h1>
          <div className="underline" aria-hidden="true" />
          <p>Rastree alquileres, disponibilidad y proyectos en una sola plataforma potente.</p>
          <div className="features" aria-label="Características de Equitrak">
            <span><Icon name="calendar" /> Control de alquileres</span>
            <span><Icon name="layers" /> Inventario de equipos</span>
            <span><Icon name="clock" /> Disponibilidad en tiempo real</span>
          </div>
        </div>
        <img className="hero-photo" src={heroPhoto}
          alt="Equipos de alquiler Equitrak: mezcladora de cemento, apisonadora, andamio modular, generador compacto, retroexcavadora y grúa de construcción" />
      </section>
      <div className="mobile-photo" role="img"
        aria-label="Flota de maquinaria y equipos de alquiler para construcción: excavadora hidráulica, plataforma elevadora, manipulador telescópico y generador industrial" />
      <section className="auth" aria-labelledby="brand-name">
        <div className="auth-content">
          <div className="brand" aria-label="Equitrak">
            <svg className="brand-mark" viewBox="0 0 64 64" role="img" aria-label="Logotipo de Equitrak">
              <path fill="#146776" d="M19 9h38l-8 12H11Z" />
              <path fill="#0F5C5C" d="M12 26h38l-8 12H4Z" />
              <path fill="#D6723A" d="M22 43h38l-8 12H14Z" />
            </svg>
            <span className="brand-name" id="brand-name">Equitrak</span>
          </div>
          <p className="brand-caption">Diseñado para el alquiler de equipos, herramientas y maquinaria.</p>
          {children}
        </div>
        <footer className="auth-footer">© Equitrak · Operaciones de alquiler simplificadas.</footer>
      </section>
    </main>
  )
}
