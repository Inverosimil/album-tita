# Álbum de Fotos

Un álbum de fotos interactivo creado con HTML, CSS y JavaScript que muestra las fotos de forma aleatoria con transiciones suaves.

## Características

- **Cambio automático**: Las fotos cambian automáticamente cada 3 segundos
- **Orden aleatorio fijo**: Al cargar se crea un orden aleatorio que evita repeticiones consecutivas
- **Repetición infinita**: El mismo orden aleatorio se repite infinitamente
- **Detección automática**: Identifica automáticamente todas las imágenes en la carpeta `photos/`
- **Diseño minimalista**: Solo la foto con un marco simple, sin texto ni controles
- **Fotos completas**: Las imágenes se muestran enteras sin cortar
- **Efectos visuales**: Transiciones suaves entre fotos

## Cómo usar

1. **Con servidor (Recomendado)**: Ejecuta `php -S localhost:8000` y abre `http://localhost:8000`
2. **Sin servidor**: Abre directamente `index.html` en tu navegador
3. Las fotos cambiarán automáticamente cada 3 segundos siguiendo un orden aleatorio fijo
4. Haz click en la imagen para avanzar manualmente a la siguiente foto
5. Al completar un ciclo de todas las fotos, se repite el mismo orden aleatorio infinitamente

## Funcionamiento inteligente

- **Al cargar**: Se identifican todas las fotos en la carpeta `photos/`
- **Orden aleatorio fijo**: Se crea una secuencia aleatoria que evita repeticiones consecutivas
- **Ciclo completo**: Muestra todas las fotos una vez antes de repetir
- **Repetición infinita**: El mismo orden aleatorio se repite para siempre

## Fotos incluidas

El álbum ya está configurado con las siguientes fotos de WhatsApp:
- WhatsApp Image 2025-09-21 at 01.37.57.jpeg
- WhatsApp Image 2025-09-21 at 01.38.52.jpeg  
- WhatsApp Image 2025-09-21 at 01.43.32.jpeg
- WhatsApp Image 2025-09-21 at 01.48.09 (1).jpeg
- WhatsApp Image 2025-09-21 at 01.48.09.jpeg

## Agregar más fotos

Para agregar más fotos:

1. Coloca tus nuevas imágenes en la carpeta `photos/`
2. Edita el archivo `script.js` y agrega las nuevas rutas al array `photos`:

```javascript
this.photos = [
    'photos/WhatsApp Image 2025-09-21 at 01.37.57.jpeg',
    'photos/WhatsApp Image 2025-09-21 at 01.38.52.jpeg',
    'photos/tu-nueva-foto.jpg',
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

- El álbum usa únicamente las imágenes locales de la carpeta `photos/`
- Para usar fotos locales, necesitarás un servidor web local
- Compatible con todos los navegadores modernos
- Total de fotos incluidas: 5 imágenes de WhatsApp