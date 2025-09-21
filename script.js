class PhotoAlbum {
    constructor() {
        this.photos = [];
        this.photoOrder = []; // Orden aleatorio de las fotos
        this.currentIndex = 0;
        this.isPlaying = true;
        this.intervalId = null;
        this.intervalTime = 5000; // 5 segundos entre fotos para apreciar mejor las transiciones
        
        this.init();
    }
    
    async init() {
        await this.loadPhotos();
        this.createRandomOrder();
        this.setupEventListeners();
        this.startSlideshow();
    }
    
    // Cargar todas las fotos de la carpeta /photos
    async loadPhotos() {
        try {
            // Lista de extensiones de imagen soportadas
            const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'];
            
            // Array para almacenar las fotos encontradas
            this.photos = [];
            
            // Intentar cargar las fotos usando diferentes métodos
            await this.loadPhotosFromDirectory(imageExtensions);
            
            if (this.photos.length > 0) {
                console.log(`Se encontraron ${this.photos.length} fotos:`, this.photos);
            } else {
                this.showNoPhotosMessage();
            }
        } catch (error) {
            console.error('Error cargando fotos:', error);
            this.showNoPhotosMessage();
        }
    }
    
    // Método para cargar fotos desde el directorio
    async loadPhotosFromDirectory(extensions) {
        try {
            // Intentar obtener la lista de fotos desde el servidor PHP
            const response = await fetch('get-photos.php');
            if (response.ok) {
                const photos = await response.json();
                this.photos = photos;
                return;
            }
        } catch (error) {
            console.log('No se pudo conectar con el servidor PHP, usando método alternativo');
        }
        
        // Método alternativo: verificar imágenes conocidas
        const photosToTest = [
            'photos/WhatsApp Image 2025-09-21 at 01.37.57.jpeg',
            'photos/WhatsApp Image 2025-09-21 at 01.38.52.jpeg',
            'photos/WhatsApp Image 2025-09-21 at 01.43.32.jpeg',
            'photos/WhatsApp Image 2025-09-21 at 01.48.09 (1).jpeg',
            'photos/WhatsApp Image 2025-09-21 at 01.48.09.jpeg'
        ];
        
        // Verificar qué imágenes existen realmente
        for (const photoPath of photosToTest) {
            try {
                await this.checkImageExists(photoPath);
                this.photos.push(photoPath);
            } catch (error) {
                console.log(`Imagen no encontrada: ${photoPath}`);
            }
        }
        
        // Si no encontramos fotos específicas, intentar con nombres genéricos
        if (this.photos.length === 0) {
            await this.tryGenericImageNames(extensions);
        }
    }
    
    // Verificar si una imagen existe
    checkImageExists(imagePath) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(imagePath);
            img.onerror = () => reject(new Error('Image not found'));
            img.src = imagePath;
        });
    }
    
    // Intentar nombres genéricos de imágenes
    async tryGenericImageNames(extensions) {
        const genericNames = [
            'photo1', 'photo2', 'photo3', 'photo4', 'photo5',
            'image1', 'image2', 'image3', 'image4', 'image5',
            'img1', 'img2', 'img3', 'img4', 'img5'
        ];
        
        for (const name of genericNames) {
            for (const ext of extensions) {
                const photoPath = `photos/${name}${ext}`;
                try {
                    await this.checkImageExists(photoPath);
                    this.photos.push(photoPath);
                } catch (error) {
                    // Continuar con el siguiente
                }
            }
        }
    }
    
    // Crear orden aleatorio de las fotos
    createRandomOrder() {
        if (this.photos.length === 0) return;
        
        // Crear array con índices de 0 a photos.length-1
        this.photoOrder = Array.from({length: this.photos.length}, (_, i) => i);
        
        // Mezclar el array usando algoritmo Fisher-Yates
        for (let i = this.photoOrder.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.photoOrder[i], this.photoOrder[j]] = [this.photoOrder[j], this.photoOrder[i]];
        }
        
        console.log('Orden aleatorio creado:', this.photoOrder);
        
        // Generar rotación aleatoria para la primera foto
        const randomRotation = this.generateRandomRotation();
        const frame = document.querySelector('.photo-frame');
        frame.style.transform = `rotate(${randomRotation}deg)`;
        
        // Mostrar la primera foto del orden aleatorio (índice 0 del orden)
        this.showPhoto(0);
    }
    
    // Mostrar una foto específica por índice del orden aleatorio
    showPhoto(orderIndex) {
        if (this.photos.length === 0) return;
        
        const photoElement = document.getElementById('current-photo');
        const frame = photoElement.parentElement;
        
        // Obtener el índice real de la foto en el array photos
        const photoIndex = this.photoOrder[orderIndex];
        
        // Generar rotación aleatoria para esta foto ANTES de mostrarla
        const randomRotation = this.generateRandomRotation();
        
        // Aplicar rotación aleatoria al marco ANTES del fade out
        frame.style.transform = `rotate(${randomRotation}deg)`;
        
        // Efecto de fade out
        photoElement.style.opacity = '0';
        
        setTimeout(() => {
            photoElement.src = this.photos[photoIndex];
            photoElement.alt = `Foto ${orderIndex + 1} del álbum`;
            
            // Efecto de fade in
            photoElement.style.opacity = '1';
            frame.classList.add('fade-in');
            
            setTimeout(() => {
                frame.classList.remove('fade-in');
            }, 1200); // Coincide con la duración de la animación fadeIn
        }, 750); // Tiempo más largo para el fade out
        
        this.currentIndex = orderIndex;
    }
    
    // Generar rotación aleatoria entre -15 y 15 grados
    generateRandomRotation() {
        return (Math.random() - 0.5) * 30; // Entre -15 y 15 grados
    }
    
    // Mostrar siguiente foto siguiendo el orden aleatorio
    nextRandomPhoto() {
        if (this.photos.length <= 1) return;
        
        // Avanzar al siguiente índice en el orden aleatorio
        const nextIndex = (this.currentIndex + 1) % this.photoOrder.length;
        this.showPhoto(nextIndex);
    }
    
    // Mostrar foto anterior siguiendo el orden aleatorio
    prevPhoto() {
        if (this.photos.length === 0) return;
        
        const prevIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.photoOrder.length - 1;
        this.showPhoto(prevIndex);
    }
    
    
    
    // Iniciar slideshow automático
    startSlideshow() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        
        this.intervalId = setInterval(() => {
            if (this.isPlaying) {
                this.nextRandomPhoto();
            }
        }, this.intervalTime);
    }
    
    
    // Configurar event listeners
    setupEventListeners() {
        // Click en la imagen para siguiente foto
        document.getElementById('current-photo').addEventListener('click', () => {
            this.nextRandomPhoto();
        });
    }
    
    // Mostrar mensaje cuando no hay fotos
    showNoPhotosMessage() {
        const photoElement = document.getElementById('current-photo');
        photoElement.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIGhheSBmb3RvcyBkaXNwb25pYmxlczwvdGV4dD48L3N2Zz4=';
        photoElement.alt = 'No hay fotos disponibles';
    }
}

// Inicializar el álbum cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    new PhotoAlbum();
});

// El álbum ahora usa únicamente las imágenes locales de la carpeta photos/
