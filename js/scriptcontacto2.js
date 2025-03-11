document.addEventListener('DOMContentLoaded', function() {
    // Form Validation
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(event) {
        if (!contactForm.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        contactForm.classList.add('was-validated');
    }, false);

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    darkModeToggle.addEventListener('click', function() {
        const isDarkMode = body.getAttribute('data-theme') === 'dark';
        body.setAttribute('data-theme', isDarkMode ? 'light' : 'dark');
        localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
        updateDarkModeIcon();
    });

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        updateDarkModeIcon();
    }

    function updateDarkModeIcon() {
        const isDarkMode = body.getAttribute('data-theme') === 'dark';
        darkModeToggle.innerHTML = isDarkMode 
            ? '<i class="bi bi-sun"></i>' 
            : '<i class="bi bi-moon-stars"></i>';
    }

    // Update current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    currentYearSpan.textContent = new Date().getFullYear();

    // Live Chat Simulation
    const chatPopup = document.getElementById('chatPopup');
    const openChatBtn = document.getElementById('openChatBtn');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const chatInput = document.getElementById('chatInput');
    const sendChatBtn = document.getElementById('sendChatBtn');
    const chatMessages = document.getElementById('chatMessages');

    openChatBtn.addEventListener('click', () => {
        chatPopup.style.display = 'block';
    });

    closeChatBtn.addEventListener('click', () => {
        chatPopup.style.display = 'none';
    });

    sendChatBtn.addEventListener('click', sendChatMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });

    function sendChatMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // User message
            const userMessageEl = document.createElement('div');
            userMessageEl.classList.add('chat-message', 'user');
            userMessageEl.innerHTML = `
                <p>${message}</p>
                <span class="chat-time">Ahora</span>
            `;
            chatMessages.appendChild(userMessageEl);

            // Simulated support response
            setTimeout(() => {
                const supportMessageEl = document.createElement('div');
                supportMessageEl.classList.add('chat-message', 'system');
                supportMessageEl.innerHTML = `
                    <p>Gracias por su mensaje. Un representante le atenderá pronto.</p>
                    <span class="chat-time">Ahora</span>
                `;
                chatMessages.appendChild(supportMessageEl);

                // Scroll to bottom
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);

            // Clear input
            chatInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    // Form Success Modal
    contactForm.addEventListener('submit', function(event) {
        if (contactForm.checkValidity()) {
            event.preventDefault();
            const formSuccessModal = new bootstrap.Modal(document.getElementById('formSuccessModal'));
            formSuccessModal.show();
            contactForm.reset();
            contactForm.classList.remove('was-validated');
        }
    });
});

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