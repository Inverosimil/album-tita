# Cómo ejecutar el álbum de fotos

## Servir los archivos (Live Server o estático)

El álbum usa un manifiesto estático `photos/list.json` para cargar todas las fotos, por lo que no necesitas PHP.

Opciones:

- VS Code Live Server
- Python
```bash
python -m http.server 8000
```
- Node.js
```bash
npx http-server -p 8000
```

Luego abre tu navegador en: `http://localhost:8000`

## Agregar nuevas fotos

1. Coloca tus nuevas imágenes en la carpeta `photos/`
2. Ejecuta el comando para regenerar `photos/list.json` (macOS/Linux):
```bash
ls -1 photos | grep -Ei '\\.(jpe?g|png|gif|webp|bmp)$' | sed 's#^#photos/#' > photos/list.txt && jq -R -s -c 'split("\\n")|map(select(length>0))' photos/list.txt > photos/list.json && rm photos/list.txt
```
En Windows, puedes generar el JSON con cualquier herramienta o manualmente.

## Formatos soportados

- .jpg / .jpeg
- .png
- .gif
- .webp
- .bmp
