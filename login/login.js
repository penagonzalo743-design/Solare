// Auth functionality - Login and Signup
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const loginToggle = document.getElementById('loginToggle');
    const signupToggle = document.getElementById('signupToggle');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const loginFormElement = document.getElementById('login-form');
    const signupFormElement = document.getElementById('signup-form');
    const loginMessage = document.getElementById('login-message');
    const signupMessage = document.getElementById('signup-message');

    // Mock credentials for demo
    const MOCK_CREDENTIALS = {
        email: 'demo@solare.com',
        password: '123456'
    };

    // Toggle between login and signup forms
    function showLogin() {
        loginToggle.classList.add('active');
        signupToggle.classList.remove('active');
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
    }

    function showSignup() {
        signupToggle.classList.add('active');
        loginToggle.classList.remove('active');
        signupForm.classList.add('active');
        loginForm.classList.remove('active');
    }

    // Event listeners for toggle buttons
    loginToggle.addEventListener('click', showLogin);
    signupToggle.addEventListener('click', showSignup);

    // Message display function
    function showMessage(element, text, type = 'error') {
        element.textContent = text;
        element.className = `message ${type}`;
        element.style.display = 'block';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }

    // Set loading state for buttons
    function setLoading(button, isLoading, originalText) {
        button.disabled = isLoading;
        button.textContent = isLoading ? 'Cargando...' : originalText;
    }

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Password validation
    function isValidPassword(password) {
        return password.length >= 8;
    }

    // Login form handler
    loginFormElement.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(loginFormElement);
        const email = formData.get('email');
        const password = formData.get('password');
        const submitButton = loginFormElement.querySelector('button[type="submit"]');

        // Basic validation
        if (!email || !password) {
            showMessage(loginMessage, 'Por favor, complete todos los campos.');
            return;
        }

        if (!isValidEmail(email)) {
            showMessage(loginMessage, 'Por favor, ingrese un email válido.');
            return;
        }

        setLoading(submitButton, true, 'Iniciar Sesión');

        // Simulate API call delay
        setTimeout(() => {
            if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
                showMessage(loginMessage, '¡Login exitoso! Redirigiendo...', 'success');
                // Redirect after success message
                setTimeout(() => {
                    window.location.href = '../index.html';
                }, 1500);
            } else {
                showMessage(loginMessage, 'Credenciales incorrectas. Intente nuevamente.');
            }
            setLoading(submitButton, false, 'Iniciar Sesión');
        }, 1000);
    });

    // Signup form handler
    signupFormElement.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(signupFormElement);
        const firstname = formData.get('firstname');
        const lastname = formData.get('lastname');
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        const termsAccepted = formData.get('terms');
        const submitButton = signupFormElement.querySelector('button[type="submit"]');

        // Basic validation
        if (!firstname || !lastname || !email || !password || !confirmPassword) {
            showMessage(signupMessage, 'Por favor, complete todos los campos obligatorios.');
            return;
        }

        if (!isValidEmail(email)) {
            showMessage(signupMessage, 'Por favor, ingrese un email válido.');
            return;
        }

        if (!isValidPassword(password)) {
            showMessage(signupMessage, 'La contraseña debe tener al menos 8 caracteres.');
            return;
        }

        if (password !== confirmPassword) {
            showMessage(signupMessage, 'Las contraseñas no coinciden.');
            return;
        }

        if (!termsAccepted) {
            showMessage(signupMessage, 'Debe aceptar los términos de servicio.');
            return;
        }

        setLoading(submitButton, true, 'Crear Cuenta');

        // Simulate API call delay
        setTimeout(() => {
            // Simulate successful registration
            showMessage(signupMessage, '¡Cuenta creada exitosamente! Redirigiendo...', 'success');
            
            // Switch to login form after successful registration
            setTimeout(() => {
                showLogin();
                // Pre-fill email in login form
                document.getElementById('login-email').value = email;
                showMessage(loginMessage, 'Cuenta creada. Ahora puede iniciar sesión.', 'success');
            }, 1500);
            
            setLoading(submitButton, false, 'Crear Cuenta');
        }, 1000);
    });

    // Clear messages when user starts typing
    function setupMessageClear(form, messageElement) {
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                if (messageElement.style.display === 'block') {
                    messageElement.style.display = 'none';
                }
            });
        });
    }

    setupMessageClear(loginFormElement, loginMessage);
    setupMessageClear(signupFormElement, signupMessage);

    // Social button handlers (placeholder functionality)
    const socialButtons = document.querySelectorAll('.btn-social');
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const provider = this.textContent.trim();
            alert(`Funcionalidad de ${provider} próximamente disponible.`);
        });
    });

    // Password visibility toggle functionality
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const passwordInput = document.getElementById(targetId);
            const eyeIcon = this.querySelector('.eye-icon');
            const eyeOffIcon = this.querySelector('.eye-off-icon');
            
            if (passwordInput.type === 'password') {
                // Show password
                passwordInput.type = 'text';
                eyeIcon.style.display = 'none';
                eyeOffIcon.style.display = 'block';
            } else {
                // Hide password
                passwordInput.type = 'password';
                eyeIcon.style.display = 'block';
                eyeOffIcon.style.display = 'none';
            }
        });
    });

    // Initialize with login form active
    showLogin();
});
