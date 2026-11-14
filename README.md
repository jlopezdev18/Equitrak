# Equitrak
Sistema de Gestión de Alquileres y Seguimiento de Equipos y Maquinaria.

## Código de verificación

LEARN-CAP-1F38DAFE

## Desarrollo local

El proyecto usa JavaScript con React y Vite en `frontend/` y un servidor Express
en `backend/`. Usa Node.js 24 y npm. También es compatible Node.js 22 desde
la versión 22.13.

### Frontend

Desde la carpeta del proyecto, en una terminal:

```bash
cd frontend
npm install
npm run dev
```

Abre la dirección que indique Vite (normalmente http://localhost:5173).
Se conserva la pantalla inicial de la plantilla de React y Vite.

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

Las pruebas de React usan React Testing Library y jsdom para verificar la
pantalla inicial y la interacción con el contador. Las de Express usan
Supertest en el entorno Node de Vitest para comprobar `GET /` y la respuesta
404 de una ruta inexistente. No es necesario iniciar los servidores para
ejecutar las pruebas.

Los archivos de prueba usan el sufijo `.test.jsx` en el frontend y `.test.js`
en el backend. `backend/app.js` define la aplicación Express y
`backend/index.js` inicia el servidor en el puerto 3000.

Documentación: [Vitest](https://vitest.dev/guide/) y
[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).
