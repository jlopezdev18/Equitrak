# Equitrak - Frontend

React con TypeScript y Vite. Formularios locales con React Hook Form.

## Desarrollo

```bash
npm install
npm run dev
```

Login: `/`. Registro: `/#registro`. Las vistas parten de las plantillas HTML
del proyecto y usan Vercel React Best Practices.

## Comandos

| Comando              | Uso                                   |
| -------------------- | ------------------------------------- |
| `npm test`           | Ejecutar las 37 pruebas de la UI.     |
| `npm run test:watch` | Repetir pruebas al guardar cambios.   |
| `npm run typecheck`  | Comprobar los tipos de TypeScript.    |
| `npm run lint`       | Revisar el código con Oxlint.         |
| `npm run build`      | Comprobar tipos y compilar a `dist/`. |
| `npm run preview`    | Servir la compilación localmente.     |

## Estructura

- `src/features/auth/`: vistas, componentes de formulario, tipos, reglas y CSS.
- `src/index.css`: estilos globales y variables de colores y espaciado.
- `src/App.test.tsx`: casos UI-01 a UI-16 y navegación.
- `src/test/setup.ts`: configuración de las pruebas.

El alcance y los criterios están en [autenticacion.md](../docs/autenticacion.md).
La revisión visual final de ambas vistas sigue pendiente.
