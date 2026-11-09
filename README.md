# API de Rastro

API en Express con TypeScript y el driver oficial de MongoDB (`mongodb`) para la entrega de Rastro.

## Puesta en marcha

1. Asegúrate de tener arrancado el contenedor de MongoDB:
```bash
docker start mongodb-practica
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea el archivo `.env` a partir del ejemplo:
```bash
cp .env.example .env
```

4. Carga los datos iniciales e índices:
```bash
npx tsx --env-file=.env src/seed.ts
```

5. Arranca el servidor en modo desarrollo:
```bash
npm run dev
```

El servidor escucha en `http://localhost:3000`.

## Scripts

- `npm run dev`: arranca el servidor con recarga en caliente (`tsx watch`).
- `npm run lint`: pasa ESLint.
- `npm run typecheck`: comprueba tipos con TypeScript (`tsc --noEmit`).

## Rutas de la API

### Health check
- `GET /api/health` — Comprueba la API y hace un ping a la base de datos.

### Anuncios (`/api/listings`)
- `GET /api/listings` — Lista de anuncios (admite filtros opcionales: `category`, `city`, `maxPrice`).
- `GET /api/listings/:id` — Ficha completa de un anuncio (suma 1 a las visitas con `$inc`).
- `POST /api/listings` — Crea un anuncio nuevo (valida campos y comprueba que el `sellerId` exista en `users`).
- `PATCH /api/listings/:id` — Modifica el precio de un anuncio.
- `DELETE /api/listings/:id` — Elimina un anuncio.
- `GET /api/listings/:id/offers` — Lista las ofertas recibidas para ese anuncio.

### Ofertas (`/api/offers`)
- `POST /api/offers` — Crea una oferta sobre un anuncio. Valida que el anuncio y el comprador existan, y devuelve 409 si el anuncio no está disponible (`AVAILABLE`).

## Pruebas

En el archivo `tests.http` están preparadas todas las peticiones de prueba (tanto casos válidos como casos de error de las tablas del enunciado). Se pueden ejecutar directamente con la extensión REST Client.

Si alguna prueba modifica o borra datos, se puede volver al estado inicial ejecutando de nuevo el seed:
```bash
npx tsx --env-file=.env src/seed.ts
```

Las preguntas teóricas y la línea del error del Ejercicio 0 están en `respuestas.md`.
