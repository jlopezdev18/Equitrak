# Equitrak

Sistema de Gestión de Alquileres y Seguimiento de Equipos y Maquinaria.

## Especificaciones

- [UI de inicio de sesión, registro y plan de pruebas](docs/autenticacion.md).
- [Instrucciones de trabajo y buenas prácticas React](AGENTS.md).

## Código de verificación

LEARN-CAP-1F38DAFE

## Desarrollo local

El proyecto usa React con TypeScript, Vite y React Hook Form en `frontend/`,
y un servidor Express en `backend/`. Usa Node.js 24 y npm. También es compatible Node.js 22 desde
la versión 22.13.

### Frontend

Desde la carpeta del proyecto, en una terminal:

```bash
cd frontend
npm install
npm run dev
```

Abre la dirección que indique Vite (normalmente http://localhost:5173).
La UI de inicio de sesión está en `/` y el registro en `/#registro`.
Ambas vistas usan las plantillas HTML de Equitrak y validan los formularios localmente.

### Backend

Desde la carpeta del proyecto, en otra terminal:

```bash
cd backend
npm install
npm run dev
```

Abre http://localhost:3000 para ver `Hello World!`.
También puedes iniciar el servidor sin recarga automática con `npm start`.

### Compilar el frontend

```bash
cd frontend
npm run build
```

## Pruebas con Vitest

Después de instalar las dependencias de `frontend/` y `backend/`, ejecuta toda
la suite desde la raíz del proyecto:

```bash
npm test
```

Para ejecutar solamente una parte de la suite desde la raíz:

```bash
npm run test:frontend
npm run test:backend
```

Para repetir automáticamente las pruebas al guardar cambios, ejecuta
`npm run test:watch` dentro de `frontend/` o `backend/`.

Las 37 pruebas de React usan React Testing Library y jsdom para verificar los
formularios, navegación, validaciones, teclado y avisos de vista previa. Las de Express usan
Supertest en el entorno Node de Vitest para comprobar `GET /` y la respuesta
404 de una ruta inexistente. No es necesario iniciar los servidores para
ejecutar las pruebas.

Los archivos de prueba usan el sufijo `.test.tsx` en el frontend y `.test.js`
en el backend. `backend/app.js` define la aplicación Express y
`backend/index.js` inicia el servidor en el puerto 3000.

Documentación: [Vitest](https://vitest.dev/guide/) y
[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

Desde `frontend/`, `npm run typecheck` verifica los tipos. `npm run build`
ejecuta esa comprobación antes de compilar.

## Formato, lint e integración continua

Las herramientas compartidas se instalan desde la raíz con `npm ci`.
Los comandos siguientes también se ejecutan desde la raíz:

| Comando                | Acción                                                             |
| ---------------------- | ------------------------------------------------------------------ |
| `npm run format`       | Aplicar Prettier a todo el proyecto.                               |
| `npm run format:check` | Comprobar el formato sin modificar archivos.                       |
| `npm run lint`         | Revisar JavaScript y TypeScript de todo el proyecto con Oxlint.    |
| `npm run lint:fix`     | Aplicar las correcciones automáticas seguras de Oxlint.            |
| `npm run fix`          | Aplicar las correcciones de lint y después el formato de Prettier. |
| `npm run check`        | Comprobar formato, lint y ejecutar todas las pruebas.              |

Prettier incluye TypeScript, JavaScript, CSS, HTML, JSON, Markdown y YAML.
Se excluyen dependencias, archivos generados, lockfiles y las skills de `.agents/`.
Oxlint conserva las reglas React de `frontend/.oxlintrc.json` y revisa también
el código del backend.

El workflow [CI](.github/workflows/ci.yml) se ejecuta en cada push y pull request,
y también permite ejecución manual. Usa Node.js 24, instala las dependencias
de las tres carpetas con `npm ci` y comprueba formato, lint y las suites de Vitest.
