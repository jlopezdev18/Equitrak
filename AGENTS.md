# Instrucciones de trabajo para Equitrak

## React

- Aplicar la skill `vercel:react-best-practices` al escribir, modificar o revisar
  cualquier código React, incluidos componentes, hooks y contextos.
- Usar TypeScript: componentes y pruebas en `.tsx`, hooks y utilidades en `.ts`.
  Mantener el modo estricto y los tipos de props, eventos y valores de formulario.
- Usar `react-hook-form` para manejar los formularios, su validación y sus errores.
- Consultar las reglas pertinentes a cada cambio y aplicarlas al stack React
  con Vite del proyecto. Las reglas específicas de Next.js corresponden solo
  a proyectos que utilicen ese framework.
- Mantener las interacciones en sus manejadores de eventos, calcular los valores
  derivados durante el render y usar efectos para sincronización externa.
- Crear componentes y hooks con responsabilidades claras. Introducir
  abstracciones y optimizaciones cuando resuelvan una necesidad concreta.
- Aplicar `vercel-composition-patterns` al diseñar o refactorizar componentes
  reutilizables, su composición o su estado compartido. Favorecer composición
  mediante `children`, variantes explícitas y responsabilidades claras.

## Inicio de sesión y registro

- Usar `equitrak-login.html` y `equitrak-register.html` como plantillas obligatorias.
- Conservar su diseño, contenido, campos y controles al adaptarlos a React.
- Consultar `docs/autenticacion.md` para el alcance y los casos de prueba.
- Esta primera etapa abarca únicamente la UI: vistas, navegación, controles,
  validación local y feedback de vista previa.

## Pruebas

- Usar Vitest, React Testing Library y user-event para las pruebas de la UI.
- Implementar cada comportamiento mediante una prueba que falle por la razón
  esperada, el código necesario para que pase y una refactorización con la
  prueba en verde.
- Probar resultados observables mediante etiquetas, roles y nombres accesibles.
- Ejecutar `npm run test:frontend` desde la raíz para verificar esta etapa.
  Al cambiar el frontend, ejecutar también su lint y compilación cuando corresponda.

## CSS

- Aplicar `web-design-guidelines` al revisar los estilos y la UI, consultando
  sus directrices actualizadas y respetando las plantillas y el alcance acordado.
- Mantener los estilos de cada funcionalidad junto a sus componentes, con formato
  legible y secciones para layout, campos, estados y breakpoints.
- Usar las variables de colores y espaciado compartidas de `frontend/src/index.css`.
- Acotar los selectores de autenticación a `.auth-page` y evitar selectores por ID,
  estilos inline y transiciones sobre todas las propiedades.
- Mantener foco visible, mensajes de error asociados a sus campos, diseño adaptable
  y respeto por `prefers-reduced-motion`.
