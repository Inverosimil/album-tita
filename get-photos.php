<?php
// Script para obtener la lista de imágenes de la carpeta photos/
header('Content-Type: application/json');

$photosDir = 'photos/';
$photos = [];

// Extensiones de imagen permitidas
$allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'];

// Verificar si el directorio existe
if (is_dir($photosDir)) {
    // Leer todos los archivos del directorio
    $files = scandir($photosDir);
    
    foreach ($files as $file) {
        // Saltar archivos ocultos y directorios
        if ($file[0] === '.') continue;
        
        // Obtener la extensión del archivo
        $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));
        
        // Verificar si es una imagen válida
        if (in_array($extension, $allowedExtensions)) {
            $photos[] = $photosDir . $file;
        }
    }
}

// Devolver la lista de fotos en formato JSON
echo json_encode($photos);
?>
