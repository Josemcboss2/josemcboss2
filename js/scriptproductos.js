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

    // Array para almacenar los productos en el carrito
    let cartItems = [];

    // Función para actualizar el contador del carrito
    function updateCartCounter() {
        const cartCounter = document.getElementById('cartCounter');
        if (cartCounter) {
            cartCounter.textContent = cartItems.length;
        }
    }

    // Función para mostrar los productos en el carrito
    function updateCartModal() {
        const cartItemsContainer = document.getElementById('cartItems');
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = ''; // Limpiar el contenido anterior

            cartItems.forEach((item, index) => {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
                listItem.innerHTML = `
                    <div>
                        <h6>${item.name}</h6>
                        <small>${item.price}</small>
                    </div>
                    <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">
                        <i class="bi bi-trash"></i>
                    </button>
                `;
                cartItemsContainer.appendChild(listItem);
            });
        }
    }

    // Función para agregar un producto al carrito
    function addToCart(productName, productPrice) {
        cartItems.push({ name: productName, price: productPrice });
        updateCartCounter();
        updateCartModal();
    }

    // Función para eliminar un producto del carrito
    window.removeFromCart = function(index) {
        cartItems.splice(index, 1);
        updateCartCounter();
        updateCartModal();
    }

    // Modificar la funcionalidad de "Añadir al carrito"
    const addToCartButtons = document.querySelectorAll('.product-card .btn-primary');
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Obtener información del producto
                const productCard = this.closest('.product-card');
                const productName = productCard.querySelector('h4').textContent;
                const productPrice = productCard.querySelector('.price').textContent;
                
                // Agregar el producto al carrito
                addToCart(productName, productPrice);
                
                // Mostrar mensaje de confirmación
                const originalText = this.textContent;
                this.innerHTML = '<i class="bi bi-check-lg"></i> Añadido';
                this.classList.remove('btn-primary');
                this.classList.add('btn-success');
                
                // Restaurar el botón después de 2 segundos
                setTimeout(() => {
                    this.textContent = originalText;
                    this.classList.remove('btn-success');
                    this.classList.add('btn-primary');
                }, 2000);
                
                // Mostrar una notificación toast
                showToast(`${productName} añadido al carrito - ${productPrice}`);
            });
        });
    }
        // Función para finalizar la compra
        function finalizarCompra() {
            // Cerrar el modal del carrito
            const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
            if (cartModal) {
                cartModal.hide(); // Cierra el modal
            }
    
            // Limpiar el carrito
            cartItems = []; // Vacía el array de productos en el carrito
            updateCartCounter(); // Actualiza el contador del carrito
            updateCartModal(); // Actualiza el modal del carrito (lo vacía)
    
            // Mostrar un mensaje de confirmación
            showToast('¡Compra finalizada con éxito! Gracias por tu compra.');
        }
    
        // Asignar la función al botón "Finalizar Compra"
        const finalizarCompraBtn = document.querySelector('#cartModal .btn-primary');
        if (finalizarCompraBtn) {
            finalizarCompraBtn.addEventListener('click', finalizarCompra);
        }
    
    });

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

document.addEventListener('DOMContentLoaded', function() {
    const filterCheckboxes = document.querySelectorAll('.filter-sidebar .form-check-input');
    const applyFilterBtn = document.querySelector('.filter-sidebar .btn-primary');
    const resetFilterBtn = document.querySelector('.filter-sidebar .btn-outline-secondary');
    const priceRange = document.getElementById('priceRange');
    const products = document.querySelectorAll('.product-card'); // Asegurar que esta clase es la correcta

    function filterProducts() {
        let activeCategories = [];
        let activeBrands = [];
        let maxPrice = priceRange ? parseFloat(priceRange.value) : Infinity;

        filterCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                if (checkbox.id.startsWith('cat')) {
                    activeCategories.push(checkbox.id.replace('cat', '').toLowerCase());
                } else if (checkbox.id.startsWith('brand')) {
                    activeBrands.push(checkbox.id.replace('brand', '').toLowerCase());
                }
            }
        });

        console.log("Categorías seleccionadas:", activeCategories);
        console.log("Marcas seleccionadas:", activeBrands);

        products.forEach(product => {
            const productCategory = product.dataset.category?.toLowerCase() || "";
            const productName = product.querySelector('h4')?.textContent.toLowerCase() || "";
            const productPrice = parseFloat(product.querySelector('.price')?.textContent.replace('$', '') || 0);

            console.log(`Producto: ${productName}, Categoría: ${productCategory}, Precio: ${productPrice}`);

            const matchesCategory = activeCategories.length === 0 || activeCategories.includes(productCategory);
            const matchesBrand = activeBrands.length === 0 || activeBrands.some(brand => productName.includes(brand));
            const matchesPrice = productPrice <= maxPrice;

            // Mostrar u ocultar el producto
            if (matchesCategory && matchesBrand && matchesPrice) {
                product.style.display = 'flex';
            } else {
                product.style.display = 'none';
            }
        });

        // Ocultar categorías vacías
        document.querySelectorAll('.category-section').forEach(section => {
            const visibleProducts = section.querySelectorAll('.product-card:not([style*="display: none"])');
            section.style.display = visibleProducts.length > 0 ? 'block' : 'none';
        });
    }

    if (applyFilterBtn) {
        applyFilterBtn.addEventListener('click', filterProducts);
    }

    if (resetFilterBtn) {
        resetFilterBtn.addEventListener('click', function() {
            filterCheckboxes.forEach(checkbox => checkbox.checked = false);
            if (priceRange) priceRange.value = priceRange.max;
            filterProducts();
        });
    }

    if (priceRange) {
        priceRange.addEventListener('input', filterProducts);
    }
});