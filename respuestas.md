# Respuestas — Entrega: API de Rastro con Express y MongoDB

## Ejercicio 0
```text
remote: - Changes must be made through a pull request.
! [remote rejected] main -> main (push declined due to repository rule violations)
```

## Pregunta 1
Se recibe un código `500` con `{"error": "Error interno del servidor"}`. Ha respondido el middleware de manejo de errores de `index.ts` (`app.use((err: unknown, ...))` al fallar el comando `ping` de MongoDB tras agotarse el tiempo de selección del servidor (5 segundos).

## Pregunta 2
<!-- ¿Por qué la segunda (?price=380) no encuentra nada? Pista: ¿en qué formato llega todo lo que viene en una URL? -->

## Pregunta 3
<!-- ¿Por qué la API ignora views y status si el cliente los envía? ¿Qué podría hacer alguien si no los ignorara? -->

## Pregunta 4
<!-- Ana baja el iPhone de 380 a 350 €. La oferta de Sara guarda una copia: listing.price: 380. ¿Debe tu PATCH cambiar también esa copia? ¿Por qué? -->

## Pregunta 5
<!-- ¿Por qué ofertar por un anuncio vendido es 409 y no 400? -->

## Pregunta 6
<!-- ¿Qué comprueba MongoDB por ti en esta API? ¿Y qué has tenido que comprobar tú en el código? Pon un ejemplo de cada. -->
