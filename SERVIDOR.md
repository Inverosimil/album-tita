# Cómo ejecutar el álbum de fotos

## Opción 1: Servidor PHP (Recomendado)

Para que el álbum detecte automáticamente todas las imágenes en la carpeta `photos/`, necesitas ejecutar un servidor web local.

### Con PHP (si tienes PHP instalado):
```bash
php -S localhost:8000
```

### Con Python (si tienes Python instalado):
```bash
python -m http.server 8000
```

### Con Node.js (si tienes Node.js instalado):
```bash
npx http-server -p 8000
```

Luego abre tu navegador en: `http://localhost:8000`

## Opción 2: Sin servidor (Limitado)

Si abres directamente `index.html` en el navegador, el álbum funcionará pero solo detectará las imágenes que estén hardcodeadas en el código.

## Agregar nuevas fotos

1. Coloca tus nuevas imágenes en la carpeta `photos/`
2. Si usas un servidor web, las nuevas fotos se detectarán automáticamente
3. Si no usas servidor, edita `script.js` y agrega las nuevas rutas al array

## Formatos soportados

- .jpg / .jpeg
- .png
- .gif
- .webp
- .bmp
