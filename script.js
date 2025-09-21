class PhotoAlbum {
    constructor() {
        this.photos = [];
        this.photoOrder = []; // Orden aleatorio de las fotos
        this.currentIndex = 0;
        this.isPlaying = true;
        this.intervalId = null;
        this.intervalTime = 4000; // 4 segundos entre fotos
        
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
        // Usar manifiesto estático en photos/list.json
        try {
            const res = await fetch(`photos/list.json?ts=${Date.now()}`, { cache: 'no-store' });
            if (res.ok) {
                const photos = await res.json();
                if (Array.isArray(photos)) {
                    this.photos = photos;
                }
            }
        } catch (err) {
            console.log('No se encontró photos/list.json');
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
        
        // Efecto de fade out
        photoElement.style.opacity = '0';
        
        setTimeout(() => {
            // establecer rotación aleatoria ligera entre -2deg y 2deg y compartirla con el marco
            const randomRotationDeg = (Math.random() * 4 - 2).toFixed(2);
            const rotationValue = `${randomRotationDeg}deg`;
            // aplicar rotación solo al marco mediante variable CSS para sincronizar con el zoom
            frame.style.setProperty('--rand-rot', rotationValue);
            // asegurar que la imagen no aporte rotación adicional
            photoElement.style.transform = 'none';

            // reiniciar animación de zoom sutil en el marco para que acompañe a la foto
            frame.classList.remove('zooming');
            // forzar reflow para reiniciar la animación CSS
            void frame.offsetWidth;
            frame.classList.add('zooming');

            photoElement.src = this.photos[photoIndex];
            photoElement.alt = `Foto ${orderIndex + 1} del álbum`;
            
            // Efecto de fade in
            photoElement.style.opacity = '1';
            frame.classList.add('fade-in');
            
            setTimeout(() => {
                frame.classList.remove('fade-in');
            }, 500);
        }, 250);
        
        this.currentIndex = orderIndex;
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
