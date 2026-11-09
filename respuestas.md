# Respuestas — Entrega: API de Rastro con Express y MongoDB

## Ejercicio 0
```text
remote: - Changes must be made through a pull request.
! [remote rejected] main -> main (push declined due to repository rule violations)
```

## Pregunta 1
Se recibe un código `500` con `{"error": "Error interno del servidor"}`. Ha respondido el middleware de manejo de errores de `index.ts` (`app.use((err: unknown, ...))` al fallar el comando `ping` de MongoDB tras agotarse el tiempo de selección del servidor (5 segundos).

## Pregunta 2
Porque todos los query params de una URL llegan como cadenas de texto (`string`). En la base de datos, `price` está almacenado como un número (`380`), por lo que MongoDB busca `{ price: "380" }` y no coincide ningún documento debido a la discrepancia de tipos.

## Pregunta 3
Porque son campos controlados exclusivamente por la lógica del servidor para garantizar las reglas de negocio (un anuncio nuevo siempre empieza con 0 visitas y disponible). Si el cliente pudiera enviarlos, un usuario malintencionado podría manipular las visitas para aparentar falsa popularidad o alterar el estado inicial del producto (por ejemplo marcándolo directamente como vendido).

## Pregunta 4
No debe cambiarla. La oferta almacena una instantánea histórica (`listing.price`) que refleja las condiciones y el precio del anuncio en el momento exacto en el que se realizó la oferta. Modificar esa copia alteraría el contexto de la negociación pasada y rompería la trazabilidad de la oferta.

## Pregunta 5
<!-- ¿Por qué ofertar por un anuncio vendido es 409 y no 400? -->

## Pregunta 6
<!-- ¿Qué comprueba MongoDB por ti en esta API? ¿Y qué has tenido que comprobar tú en el código? Pon un ejemplo de cada. -->
