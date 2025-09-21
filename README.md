# Álbum de Fotos

Un álbum de fotos interactivo creado con HTML, CSS y JavaScript que muestra las fotos de forma aleatoria con transiciones suaves.

## Características

- **Cambio automático**: Las fotos cambian automáticamente cada 3 segundos
- **Navegación aleatoria**: Cada foto se selecciona de forma aleatoria
- **Controles interactivos**: Botones para pausar, siguiente y anterior
- **Navegación por teclado**: Usa las flechas del teclado para navegar
- **Diseño responsivo**: Se adapta a diferentes tamaños de pantalla
- **Efectos visuales**: Transiciones suaves y efectos hover

## Cómo usar

1. Abre `index.html` en tu navegador
2. Las fotos cambiarán automáticamente cada 3 segundos
3. Usa los controles para navegar manualmente:
   - **Pausar/Reproducir**: Detiene o reanuda el slideshow
   - **Siguiente**: Muestra la siguiente foto aleatoria
   - **Anterior**: Muestra la foto anterior

## Controles de teclado

- `←` (Flecha izquierda): Foto anterior
- `→` (Flecha derecha) o `Espacio`: Siguiente foto aleatoria
- `Escape`: Pausar/reanudar slideshow

## Agregar tus propias fotos

Para usar tus propias fotos:

1. Coloca tus imágenes en la carpeta `photos/`
2. Edita el archivo `script.js` y reemplaza el array `photos` en el constructor con las rutas de tus imágenes:

```javascript
this.photos = [
    'photos/tu-foto-1.jpg',
    'photos/tu-foto-2.jpg',
    'photos/tu-foto-3.jpg',
    // ... más fotos
];
```

## Estructura del proyecto

```
album-tita/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Lógica JavaScript
├── photos/             # Carpeta para tus fotos
└── README.md           # Este archivo
```

## Personalización

- **Velocidad**: Cambia `this.intervalTime` en `script.js` (en milisegundos)
- **Estilos**: Modifica `styles.css` para cambiar colores, tamaños, etc.
- **Efectos**: Ajusta las transiciones en el CSS

## Notas técnicas

- El álbum usa fotos de ejemplo de Picsum para demostración
- Para usar fotos locales, necesitarás un servidor web local
- Compatible con todos los navegadores modernos