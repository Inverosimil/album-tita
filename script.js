class PhotoAlbum {
    constructor() {
        this.photos = [];
        this.currentIndex = 0;
        this.isPlaying = true;
        this.intervalId = null;
        this.intervalTime = 3000; // 3 segundos entre fotos
        
        this.init();
    }
    
    init() {
        this.loadPhotos();
        this.setupEventListeners();
        this.startSlideshow();
    }
    
    // Cargar todas las fotos de la carpeta /photos
    async loadPhotos() {
        try {
            // En un entorno real, necesitarías un servidor para listar archivos
            // Por ahora, usaremos fotos de ejemplo con URLs de placeholder
            this.photos = [
                'https://picsum.photos/800/500?random=1',
                'https://picsum.photos/800/500?random=2',
                'https://picsum.photos/800/500?random=3',
                'https://picsum.photos/800/500?random=4',
                'https://picsum.photos/800/500?random=5',
                'https://picsum.photos/800/500?random=6',
                'https://picsum.photos/800/500?random=7',
                'https://picsum.photos/800/500?random=8',
                'https://picsum.photos/800/500?random=9',
                'https://picsum.photos/800/500?random=10'
            ];
            
            if (this.photos.length > 0) {
                this.showPhoto(0);
                this.updateCounter();
            } else {
                this.showNoPhotosMessage();
            }
        } catch (error) {
            console.error('Error cargando fotos:', error);
            this.showNoPhotosMessage();
        }
    }
    
    // Mostrar una foto específica
    showPhoto(index) {
        if (this.photos.length === 0) return;
        
        const photoElement = document.getElementById('current-photo');
        const frame = photoElement.parentElement;
        
        // Efecto de fade out
        photoElement.style.opacity = '0';
        
        setTimeout(() => {
            photoElement.src = this.photos[index];
            photoElement.alt = `Foto ${index + 1} del álbum`;
            
            // Efecto de fade in
            photoElement.style.opacity = '1';
            frame.classList.add('fade-in');
            
            setTimeout(() => {
                frame.classList.remove('fade-in');
            }, 500);
        }, 250);
        
        this.currentIndex = index;
        this.updateCounter();
    }
    
    // Mostrar siguiente foto de forma aleatoria
    nextRandomPhoto() {
        if (this.photos.length <= 1) return;
        
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.photos.length);
        } while (newIndex === this.currentIndex && this.photos.length > 1);
        
        this.showPhoto(newIndex);
    }
    
    // Mostrar foto anterior
    prevPhoto() {
        if (this.photos.length === 0) return;
        
        const prevIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.photos.length - 1;
        this.showPhoto(prevIndex);
    }
    
    // Mostrar siguiente foto en orden
    nextPhoto() {
        if (this.photos.length === 0) return;
        
        const nextIndex = this.currentIndex < this.photos.length - 1 ? this.currentIndex + 1 : 0;
        this.showPhoto(nextIndex);
    }
    
    // Actualizar contador de fotos
    updateCounter() {
        const counterElement = document.getElementById('photo-counter');
        counterElement.textContent = `${this.currentIndex + 1} / ${this.photos.length}`;
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
    
    // Pausar/reanudar slideshow
    togglePlayPause() {
        this.isPlaying = !this.isPlaying;
        const pauseBtn = document.getElementById('pause-btn');
        
        if (this.isPlaying) {
            pauseBtn.textContent = '⏸️ Pausar';
            pauseBtn.style.background = 'rgba(255,255,255,0.2)';
        } else {
            pauseBtn.textContent = '▶️ Reproducir';
            pauseBtn.style.background = 'rgba(255,255,255,0.4)';
        }
    }
    
    // Configurar event listeners
    setupEventListeners() {
        // Botón de pausa/reproducción
        document.getElementById('pause-btn').addEventListener('click', () => {
            this.togglePlayPause();
        });
        
        // Botón siguiente
        document.getElementById('next-btn').addEventListener('click', () => {
            this.nextRandomPhoto();
        });
        
        // Botón anterior
        document.getElementById('prev-btn').addEventListener('click', () => {
            this.prevPhoto();
        });
        
        // Navegación con teclado
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                    this.prevPhoto();
                    break;
                case 'ArrowRight':
                case ' ':
                    e.preventDefault();
                    this.nextRandomPhoto();
                    break;
                case 'Escape':
                    this.togglePlayPause();
                    break;
            }
        });
        
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
        
        const counterElement = document.getElementById('photo-counter');
        counterElement.textContent = '0 / 0';
    }
}

// Inicializar el álbum cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    new PhotoAlbum();
});

// Función para agregar fotos locales (para uso futuro)
function addLocalPhotos(photoPaths) {
    // Esta función se puede usar cuando tengas fotos locales
    // photoPaths debería ser un array de rutas a las imágenes
    console.log('Para usar fotos locales, reemplaza las URLs en el array photos del constructor');
}
