document.addEventListener('DOMContentLoaded', function() {
    // Establecer el año actual en el footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Cambiar estilo del navbar al hacer scroll
    const navbar = document.getElementById('mainNav');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }

    // Funcionalidad para el modo oscuro
    const darkModeToggle = document.getElementById('darkModeToggle');
    const htmlElement = document.documentElement;
    
    // Función para aplicar el tema
    function applyTheme(theme) {
        htmlElement.setAttribute('data-bs-theme', theme);
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateDarkModeIcon(theme === 'dark');
    }
    
    // Verificar si hay preferencia guardada
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme('light'); // Establecer light como predeterminado
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            const currentTheme = htmlElement.getAttribute('data-bs-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            applyTheme(newTheme);
        });
    }

    function updateDarkModeIcon(isDark) {
        if (darkModeToggle) {
            const moonIcon = darkModeToggle.querySelector('.bi-moon-stars');
            const sunIcon = darkModeToggle.querySelector('.bi-sun');
            
            if (moonIcon && sunIcon) {
                if (isDark) {
                    moonIcon.style.display = 'none';
                    sunIcon.style.display = 'inline-block';
                } else {
                    moonIcon.style.display = 'inline-block';
                    sunIcon.style.display = 'none';
                }
            }
        }
    }
    // Funcionalidad para el filtro de productos
    const filterCheckboxes = document.querySelectorAll('.filter-sidebar .form-check-input');
    const priceRange = document.getElementById('priceRange');
    const resetFilterBtn = document.querySelector('.filter-sidebar .btn-outline-secondary');
    
    if (filterCheckboxes.length > 0 && resetFilterBtn) {
        resetFilterBtn.addEventListener('click', function() {
            filterCheckboxes.forEach(checkbox => {
                checkbox.checked = true;
            });
            
            if (priceRange) {
                priceRange.value = priceRange.max;
            }
        });
    }

    // Simulación de la funcionalidad de "Añadir al carrito"
    const addToCartButtons = document.querySelectorAll('.product-card .btn-primary');
    
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Obtener información del producto
                const productCard = this.closest('.product-card');
                const productName = productCard.querySelector('h4').textContent;
                const productPrice = productCard.querySelector('.price').textContent;
                
                // Mostrar mensaje de confirmación
                const originalText = this.textContent;
                this.innerHTML = '<i class="bi bi-check-lg"></i> Añadido';
                this.classList.remove('btn-primary');
                this.classList.add('btn-success');
                
                // Actualizar contador del carrito (simulado)
                updateCartCounter();
                
                // Restaurar el botón después de 2 segundos
                setTimeout(() => {
                    this.textContent = originalText;
                    this.classList.remove('btn-success');
                    this.classList.add('btn-primary');
                }, 2000);
                
                // Mostrar una notificación toast (requiere agregar HTML en la página)
                showToast(`${productName} añadido al carrito - ${productPrice}`);
            });
        });
    }

    // Función para actualizar el contador del carrito (simulado)
    function updateCartCounter() {
        const cartCounter = document.getElementById('cartCounter');
        if (cartCounter) {
            let count = parseInt(cartCounter.textContent || '0');
            cartCounter.textContent = count + 1;
        }
    }

    // Función para mostrar notificaciones toast
    function showToast(message) {
        let toastContainer = document.querySelector('.toast-container');
        
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
            document.body.appendChild(toastContainer);
        }
        
        const toastId = 'toast-' + Date.now();
        const toastHTML = `
            <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <strong class="me-auto">TechZone</strong>
                    <small>Ahora</small>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    ${message}
                </div>
            </div>
        `;
        
        toastContainer.insertAdjacentHTML('beforeend', toastHTML);
        
        const toastElement = document.getElementById(toastId);
        const toast = new bootstrap.Toast(toastElement, { 
            autohide: true,
            delay: 3000
        });
        toast.show();
        
        toastElement.addEventListener('hidden.bs.toast', function() {
            toastElement.remove();
        });
    }

    // Funcionalidad para el "Cargar más productos"
    const loadMoreBtn = document.querySelector('.btn-outline-primary.btn-lg');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            const originalText = this.textContent;
            this.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Cargando...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
                
                showToast('No hay más productos para mostrar');
            }, 2000);
        });
    }

    // Activar todos los tooltips de Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Validación de formulario de suscripción al newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const privacyCheck = document.getElementById('privacyConsent');
            
            if (emailInput && emailInput.value && privacyCheck && privacyCheck.checked) {
                const submitBtn = this.querySelector('button[type="submit"]');
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...';
                
                setTimeout(() => {
                    emailInput.value = '';
                    privacyCheck.checked = false;
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Suscribirse';
                    
                    showToast('¡Gracias por suscribirte! Pronto recibirás nuestras novedades.');
                }, 1500);
            }
        });
    }
});