# UI de inicio de sesión y registro de Equitrak

**Etapa:** interfaz de usuario. **Estado:** UI implementada con pruebas
automatizadas; revisión visual final pendiente. **Rama:** `feature/login-registro`.

## 1. Objetivo y plantillas obligatorias

Construir en React con TypeScript las vistas de inicio de sesión y registro, con navegación,
controles interactivos y validación local de los formularios.

Se utilizarán estas plantillas como base obligatoria:

- [equitrak-login.html](../equitrak-login.html): vista inicial de inicio de sesión.
- [equitrak-register.html](../equitrak-register.html): vista de registro.

Se conservarán la marca, el logotipo, la fotografía de maquinaria, la paleta,
la tipografía, la distribución adaptable, los textos de los formularios, sus
campos, enlaces inferiores y controles. La lógica de interacción se adaptará a componentes
y estado de React, compartiendo las partes comunes de las dos vistas.

Todo el código React seguirá `vercel:react-best-practices`, según
[AGENTS.md](../AGENTS.md). Se aplicará `vercel-composition-patterns` cuando
corresponda a la composición de componentes reutilizables. Los formularios se
manejan con `react-hook-form`, con tipos para sus valores y reglas de validación
local. Los componentes y pruebas usan `.tsx`; las utilidades y configuración, `.ts`.

Los estilos se organizan en `frontend/src/features/auth/auth.css`, acotados a
`.auth-page`. Los colores y espacios compartidos se definen en
`frontend/src/index.css`. Se mantienen foco visible, mensajes asociados a cada
campo, breakpoints adaptables y soporte para movimiento reducido.

## 2. Alcance de esta etapa

- Mostrar los formularios de inicio de sesión y registro en español.
- Alternar entre vistas mediante los enlaces inferiores de las plantillas.
- Mostrar u ocultar cada contraseña de forma independiente.
- Validar los campos y presentar mensajes de ayuda o error.
- Permitir el uso de los formularios mediante teclado.
- Reflejar el estado de «Recordarme» y de la aceptación de términos y privacidad.
- Mostrar avisos de vista previa al validar correctamente un formulario o usar
  recuperación, términos y privacidad.
- Mantener el diseño legible y utilizable en escritorio y móvil.

Los formularios tendrán estados inicial, edición, validación incorrecta y
validación local completada. El feedback de validación completada indicará
claramente que se trata de una vista previa del formulario.

## 3. Campos y validación local

Las reglas de esta etapa siguen los formularios de las plantillas.

### Inicio de sesión

| Campo o control | Comportamiento esperado |
| --- | --- |
| Correo electrónico | Obligatorio y con formato de correo válido; se ignoran espacios externos al validar. |
| Contraseña | Obligatoria; inicialmente oculta. Se conserva exactamente lo escrito. |
| Mostrar u ocultar contraseña | Alterna la visibilidad y actualiza el nombre accesible y `aria-pressed`. |
| Recordarme | Inicialmente marcado, como en la plantilla; permite cambiar su estado durante la interacción. |
| ¿Olvidó su contraseña? | Muestra un aviso de vista previa. |

El login exige una contraseña no vacía. La longitud mínima del registro no se
aplica a este formulario.

### Registro

El formulario se presenta en una sola columna: nombre y apellido, correo
electrónico, teléfono de contacto, contraseña y confirmar contraseña, en ese
orden. Contraseña y confirmar contraseña ocupan filas consecutivas de ancho
completo. La navegación entre vistas se realiza con los enlaces inferiores.

| Campo o control | Comportamiento esperado |
| --- | --- |
| Nombre y apellido | Obligatorio; una cadena vacía o formada solo por espacios es inválida. No se exige un número fijo de palabras. |
| Correo electrónico | Obligatorio y con formato de correo válido; se ignoran espacios externos al validar. Se admiten proveedores de correo personales. |
| Teléfono de contacto | Obligatorio y con al menos 7 caracteres después de quitar espacios externos, siguiendo la validación del prototipo. |
| Contraseña | Obligatoria, con un mínimo de 8 caracteres, como indica la plantilla. Inicialmente oculta; se conserva exactamente lo escrito. |
| Confirmar contraseña | Obligatoria y con coincidencia exacta con la contraseña. Inicialmente oculta. |
| Mostrar u ocultar contraseñas | Cada botón controla únicamente su campo y conserva el valor introducido. |
| Aceptación de términos y privacidad | Inicialmente desmarcada; debe marcarse para completar la validación local. |
| Enlaces a términos y privacidad | Muestran los avisos de vista previa correspondientes. |

### Mensajes y navegación

- Un campo inválido muestra un mensaje comprensible y se identifica mediante
  `aria-invalid`; el primer campo inválido recibe el foco al enviar.
- Los mensajes se anuncian mediante una región de estado accesible, como en las
  plantillas.
- Al editar los datos se limpia el feedback anterior para permitir la corrección.
- Al cambiar entre formularios se limpian los errores y el foco pasa al primer
  campo de la vista seleccionada.
- Un formulario válido muestra un aviso de validación local en modo vista previa
  y permanece en su vista, sin recargar la página.
- Los botones para mostrar contraseñas y cambiar de vista no envían el formulario.

## 4. Casos de prueba a implementar

Los casos UI-01 a UI-16 están automatizados en
[App.test.tsx](../frontend/src/App.test.tsx) con Vitest, React Testing Library,
user-event y jsdom. Cada ID aparece en el nombre de su prueba; la suite contiene
37 pruebas, incluyendo casos parametrizados y navegación mediante fragmentos.

| ID | Acción o condición | Resultado observable |
| --- | --- | --- |
| UI-01 | Abrir la vista de login. | Formulario, etiquetas y controles de `equitrak-login.html`; únicamente el enlace inferior para cambiar de vista, contraseña oculta y «Recordarme» marcado. |
| UI-02 | Abrir la vista de registro. | Los cinco campos de `equitrak-register.html` en el orden definido, etiqueta «Correo electrónico», contraseñas ocultas y términos desmarcados. |
| UI-03 | Usar los enlaces inferiores «Regístrese aquí» e «Inicie sesión aquí». | Solo aparece el formulario seleccionado, se limpian errores y el foco llega al primer campo. Los controles son enlaces accesibles mediante teclado. |
| UI-04 | Pulsar mostrar u ocultar en cada uno de los tres campos de contraseña. | Solo cambia la visibilidad del campo elegido; se conserva su valor y se actualizan su nombre accesible y `aria-pressed`. |
| UI-05 | Recorrer los formularios con teclado y enviarlos con campos inválidos. | Controles con etiquetas, interacción mediante teclado y foco en el primer campo inválido, identificado con `aria-invalid`. |
| UI-06 | Enviar registro con cada campo obligatorio vacío o con texto formado solo por espacios donde corresponda. | Se muestra el error correspondiente y no aparece feedback de validación completada. |
| UI-07 | Introducir un correo con formato inválido en cada formulario. | Se identifica el campo y se muestra el mensaje de correo inválido. |
| UI-08 | Introducir contraseñas de 7 y 8 caracteres en el registro. | La primera se rechaza y la segunda supera la regla de longitud. Se conserva el texto escrito, incluidos espacios. |
| UI-09 | Enviar contraseñas distintas o términos sin aceptar. | Mensaje específico para cada condición; no aparece feedback de validación completada. |
| UI-10 | Enviar login sin correo o sin contraseña. | Mensaje del campo correspondiente; probar cada ausencia por separado. |
| UI-11 | Introducir un teléfono vacío, de 6 caracteres y de 7 caracteres después de quitar espacios externos. | Se rechazan los dos primeros y el último supera la regla de longitud de la plantilla. |
| UI-12 | Enviar login con datos válidos para la validación local. | Aviso de vista previa, sin recargar la página ni abandonar la vista de login. |
| UI-13 | Enviar registro con todos los campos válidos, contraseñas coincidentes y términos aceptados. | Aviso de vista previa, sin recargar la página ni abandonar la vista de registro. |
| UI-14 | Editar los datos después de un error o aviso. | Se limpia el feedback anterior y el formulario permite una nueva validación. Probar ambas vistas. |
| UI-15 | Marcar y desmarcar «Recordarme». | El control refleja el estado elegido y no altera los valores de los campos. |
| UI-16 | Usar recuperación de contraseña, términos y privacidad. | Cada control muestra su aviso de vista previa correspondiente y mantiene el formulario visible. |

Las pruebas usarán consultas por etiquetas, roles y nombres accesibles y
comprobarán resultados visibles. Se evitarán aserciones sobre clases CSS o
detalles internos de hooks. Los casos UI-01 y UI-02 verifican estructura y
contenido; la comparación visual se realizará por separado.

### Revisión visual

| ID | Comprobación | Resultado esperado |
| --- | --- | --- |
| VIS-01 | Comparar las vistas React con las dos plantillas en escritorio y móvil. | Misma identidad visual y distribución; registro en una columna con contraseña y confirmación una debajo de la otra, campos legibles, controles accesibles, sin desbordamiento y con estados de foco y error visibles. |

**Estado de VIS-01:** pendiente de completar para la versión final. Los tests
con jsdom comprueban interacción y contenido; la apariencia requiere una
comparación en navegador.

## 5. Orden de trabajo mediante TDD

1. Implementar UI-01 y UI-02 mientras se adaptan las plantillas a React.
2. Implementar navegación, visibilidad de contraseñas y teclado: UI-03 a UI-05.
3. Añadir las validaciones locales de UI-06 a UI-11, un caso a la vez.
4. Completar feedback y controles adicionales: UI-12 a UI-16.
5. Realizar VIS-01 y ajustar el diseño a las plantillas.

Para cada caso: ejecutar la prueba y comprobar el fallo esperado, implementar
lo necesario, volver a ejecutarla y refactorizar manteniéndola en verde. Se
adaptarán las pruebas de la pantalla inicial de Vite al reemplazarla por estas
vistas.

## 6. Verificación y criterio de finalización

Ejecutar las pruebas de esta etapa desde la raíz:

```bash
npm run test:frontend
```

Dentro de `frontend/`, ejecutar también:

```bash
npm run test:watch
npm run typecheck
npm run lint
npm run build
```

El modo `test:watch` se usa durante el desarrollo y se detiene al terminar.

La etapa estará terminada cuando UI-01 a UI-16 estén implementados y pasen,
la comprobación de tipos, el lint y la compilación finalicen correctamente y
se complete VIS-01 contra ambas plantillas. VIS-01 sigue pendiente.
