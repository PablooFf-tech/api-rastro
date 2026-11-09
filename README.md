# API de Rastro

API RESTful para la plataforma de compraventa de segunda mano **Rastro**, construida con **Express**, **TypeScript** y el driver oficial de **MongoDB**.

---

## 📋 Requisitos previos

- **Node.js** (v20 o superior recomendado, v24 en CI)
- **npm** (v10 o superior)
- **Docker** con el contenedor `mongodb-practica` en ejecución en el puerto `27017`

---

## 🚀 Instalación y Configuración

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/PablooFf-tech/api-rastro.git
   cd api-rastro
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Variables de entorno:**
   Copia el archivo de ejemplo `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```
   Asegúrate de que contenga los valores para tu base de datos local:
   ```env
   MONGODB_URI=mongodb://admin:admin_dev_123@localhost:27017/?authSource=admin
   DB_NAME=rastro
   ```

---

## 🗄️ Carga de Datos Iniciales (Seed)

El proyecto incluye un script reproducible en TypeScript (`src/seed.ts`) que resetea la base de datos `rastro` y carga las colecciones (`users`, `listings`, `offers`, `reviews`) con sus índices:

```bash
npx tsx --env-file=.env src/seed.ts
```

> **Aviso:** Este script ejecuta `dropDatabase()` en la base de datos `rastro`, restaurando el dataset original de prueba: 5 usuarios, 8 anuncios, 5 ofertas y 1 valoración.

---

## 💻 Ejecución del Servidor

- **Modo desarrollo (con recarga automática):**
  ```bash
  npm run dev
  ```
  El servidor escuchará en `http://localhost:3000`.

- **Comprobar linters y tipos:**
  ```bash
  npm run lint        # ESLint
  npm run typecheck   # Comprobación de tipos de TypeScript sin emitir código
  ```

---

## 📡 Endpoints de la API

### Health Check
- `GET /api/health`: Comprueba el estado del servidor y ejecuta un comando `ping` contra MongoDB.

### Anuncios (`/api/listings`)
- `GET /api/listings`: Listado de anuncios ordenados por `publishedAt` descendente. Proyección optimizada. Admite query params opcionales:
  - `category`: filtra por categoría exacta (ej. `Cars`, `Phones`).
  - `city`: filtra por ciudad (ej. `Valencia`).
  - `maxPrice`: filtra anuncios con precio menor o igual (ej. `100`). Devuelve `400` si no es numérico.
- `GET /api/listings/:id`: Ficha detallada del anuncio. Incrementa de forma atómica el contador de `views` en 1 (`$inc`). Devuelve `400` si el id es inválido y `404` si no existe.
- `POST /api/listings`: Publica un nuevo anuncio. Valida campos obligatorios, verifica que `sellerId` exista en `users` y copia su nombre de forma desnormalizada. Fuerza `status: AVAILABLE`, `views: 0`, `photos: []` y fecha actual, ignorando entradas no permitidas del cliente. Devuelve `201`.
- `PATCH /api/listings/:id`: Actualiza el precio del anuncio (`price` obligatorio, >= 0). Devuelve `200` con el anuncio modificado.
- `DELETE /api/listings/:id`: Elimina un anuncio. Devuelve `204` si se eliminó o `404` si no existía.
- `GET /api/listings/:id/offers`: Devuelve todas las ofertas asociadas al anuncio indicado. Devuelve `404` si el anuncio no existe.

### Ofertas (`/api/offers`)
- `POST /api/offers`: Crea una nueva oferta de compra. Valida en orden estricto:
  1. Formato de `listingId` y `buyerId` (400 si inválido).
  2. `amount` mayor que 0 (400 si inválido).
  3. Existencia del anuncio (400 si no existe).
  4. Existencia del comprador (400 si no existe).
  5. Disponibilidad del anuncio: solo se permite ofertar si `status === "AVAILABLE"` (409 Conflict si está vendido o reservado).
  Almacena copias históricas desnormalizadas de anuncio y comprador. Devuelve `201`.

---

## 🧪 Pruebas Reproducibles

Se incluye el archivo [`tests.http`](./tests.http) para probar todas las rutas (casos de éxito y casos de error de las tablas de pruebas de cada parte) usando la extensión **REST Client** de VS Code o similar.

Para restaurar los datos tras pruebas que modifiquen o borren registros:
```bash
npx tsx --env-file=.env src/seed.ts
```

---

## 📁 Estructura del Proyecto

```text
api-rastro/
├── .github/
│   └── workflows/
│       └── ci.yml          # Flujo de CI (HTMLHint + ESLint)
├── src/
│   ├── routes/
│   │   ├── listings.ts     # Endpoints de anuncios
│   │   └── offers.ts       # Endpoints de ofertas
│   ├── db.ts               # Conexión con MongoDB
│   ├── index.ts            # Servidor Express, middlewares y health check
│   ├── seed.ts             # Script de carga inicial de datos e índices
│   └── types.ts            # Definiciones de tipos TypeScript
├── .env.example            # Plantilla de variables de entorno
├── .gitignore
├── eslint.config.mjs       # Configuración de ESLint con TypeScript ESLint
├── package.json
├── README.md               # Documentación general
├── respuestas.md           # Respuestas a las preguntas del enunciado
├── tests.http              # Peticiones de prueba reproducibles
└── tsconfig.json           # Configuración de TypeScript
```
