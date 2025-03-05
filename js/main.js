// Wait for DOM to be loaded
document.addEventListener("DOMContentLoaded", function() {
    // Set current year in footer
    document.getElementById("currentYear").textContent = new Date().getFullYear();
    
    // Check for saved theme preference or default to 'light'
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateDarkModeIcon(savedTheme);
    
    // Dark mode toggle functionality
    const darkModeToggle = document.getElementById("darkModeToggle");
    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            updateDarkModeIcon(newTheme);
        });
    }
    
    // Function to update dark mode icon
    function updateDarkModeIcon(theme) {
        const darkModeToggle = document.getElementById("darkModeToggle");
        if (darkModeToggle) {
            if (theme === 'dark') {
                darkModeToggle.innerHTML = '<i class="bi bi-sun"></i>';
            } else {
                darkModeToggle.innerHTML = '<i class="bi bi-moon-stars"></i>';
            }
        }
    }
    
    // Show welcome modal on first visit
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (!hasVisited) {
        setTimeout(showWelcomeModal, 2000);
        sessionStorage.setItem('hasVisited', 'true');
    }
    
    // Add animation classes to elements when they become visible
    const animatedElements = document.querySelectorAll('.service-card, .product-card, .category-card, .article-card, .testimonial-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add scroll animation to about section
    const aboutSection = document.querySelector('.about-content');
    if (aboutSection) {
        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    aboutSection.classList.add('slide-in-right');
                    aboutObserver.unobserve(aboutSection);
                }
            });
        }, { threshold: 0.1 });
        
        aboutObserver.observe(aboutSection);
    }
    
    // Services button click handler
    const showServicesBtn = document.getElementById("showServicesBtn");
    if (showServicesBtn) {
        showServicesBtn.addEventListener("click", function() {
            document.querySelector("#services").scrollIntoView({ behavior: "smooth" });
        });
    }
    
    // Form validation for contact form
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            // Simple validation
            let valid = true;
            const name = document.getElementById("name");
            const email = document.getElementById("email");
            const message = document.getElementById("message");
            
            if (!name.value.trim()) {
                showValidationError(name, "Por favor ingrese su nombre");
                valid = false;
            } else {
                removeValidationError(name);
            }
            
            if (!email.value.trim()) {
                showValidationError(email, "Por favor ingrese su correo electrónico");
                valid = false;
            } else if (!isValidEmail(email.value)) {
                showValidationError(email, "Por favor ingrese un correo electrónico válido");
                valid = false;
            } else {
                removeValidationError(email);
            }
            
            if (!message.value.trim()) {
                showValidationError(message, "Por favor ingrese su mensaje");
                valid = false;
            } else {
                removeValidationError(message);
            }
            
            if (valid) {
                // If form is valid, show success message
                showFormSubmitModal();
                
                // Reset form
                contactForm.reset();
                
                // In a real application, you would send the form data to a server here
            }
        });
    }
    
    // Email validation function
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    // Show validation error
    function showValidationError(input, message) {
        const formControl = input.parentElement;
        const errorElement = formControl.querySelector('.invalid-feedback') || document.createElement('div');
        
        if (!formControl.querySelector('.invalid-feedback')) {
            errorElement.className = 'invalid-feedback';
            formControl.appendChild(errorElement);
        }
        
        input.className = 'form-control is-invalid';
        errorElement.textContent = message;
    }
    
    // Remove validation error
    function removeValidationError(input) {
        input.className = 'form-control is-valid';
    }
    
    // Newsletter subscription
    const newsletterForm = document.getElementById("newsletterForm");
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const email = document.getElementById("newsletterEmail");
            
            if (!email.value.trim() || !isValidEmail(email.value)) {
                showValidationError(email, "Por favor ingrese un correo electrónico válido");
            } else {
                removeValidationError(email);
                showNewsletterModal();
                newsletterForm.reset();
            }
        });
    }
    
    // Filter functionality for products page
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filterValue = this.getAttribute('data-filter');
                
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show/hide products based on filter
                const products = document.querySelectorAll('.product-item');
                products.forEach(product => {
                    if (filterValue === 'all') {
                        product.style.display = 'block';
                    } else if (product.classList.contains(filterValue)) {
                        product.style.display = 'block';
                    } else {
                        product.style.display = 'none';
                    }
                });
            });
        });
    }
});

// Show welcome modal
function showWelcomeModal() {
    const welcomeModal = new bootstrap.Modal(document.getElementById('welcomeModal'));
    welcomeModal.show();
}

// Show product details modal
function showProductModal(productName) {
    const productModal = new bootstrap.Modal(document.getElementById('productModal'));
    
    // Update modal content based on product name
    document.getElementById('productModalLabel').textContent = productName;
    
    // You can add more dynamic content based on the product name
    
    productModal.show();
}

// Show form submit success modal
function showFormSubmitModal() {
    const formModal = new bootstrap.Modal(document.getElementById('formSubmitModal'));
    formModal.show();
}

// Show newsletter subscription success modal
function showNewsletterModal() {
    const newsletterModal = new bootstrap.Modal(document.getElementById('newsletterModal'));
    newsletterModal.show();
}

// Add to cart functionality
function addToCart(productName, price) {
    // In a real application, you would add the product to a shopping cart
    // For demonstration purposes, we'll just show a notification
    
    const toastContainer = document.getElementById('toast-container');
    
    const toastElement = document.createElement('div');
    toastElement.className = 'toast show';
    toastElement.setAttribute('role', 'alert');
    toastElement.setAttribute('aria-live', 'assertive');
    toastElement.setAttribute('aria-atomic', 'true');
    
    toastElement.innerHTML = `
        <div class="toast-header">
            <strong class="me-auto">TechZone</strong>
            <small>Ahora</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            <i class="bi bi-check-circle-fill text-success me-2"></i> ${productName} ha sido añadido al carrito.
        </div>
    `;
    
    toastContainer.appendChild(toastElement);
    
    // Remove the toast after 5 seconds
    setTimeout(() => {
        toastElement.remove();
    }, 5000);
}
