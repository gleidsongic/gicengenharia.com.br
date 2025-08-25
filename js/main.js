document.addEventListener("DOMContentLoaded", function() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
    });

    // Hamburger Menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Header Scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxTitle = lightbox.querySelector('.lightbox-title');
    const lightboxDescription = lightbox.querySelector('.lightbox-description');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const title = item.querySelector('h3').textContent;
            const description = item.querySelector('p').textContent;
            
            lightboxImage.src = img.src;
            lightboxTitle.textContent = title;
            lightboxDescription.textContent = description;
            lightbox.style.display = 'flex';
        });
    });

    function closeLightbox() {
        lightbox.style.display = 'none';
    }

    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Portfolio Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioGrid = document.querySelector('.portfolio-grid');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.dataset.filter;
            
            Array.from(portfolioGrid.children).forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Stats Counter
    const stats = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.about-stats');

    const countUp = (el) => {
        const count = parseInt(el.dataset.count, 10);
        let current = 0;
        const increment = Math.ceil(count / 100);

        const timer = setInterval(() => {
            current += increment;
            if (current >= count) {
                current = count;
                clearInterval(timer);
            }
            el.textContent = current;
        }, 20);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                stats.forEach(stat => countUp(stat));
                observer.unobserve(statsSection);
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        observer.observe(statsSection);
    }

    // Contact Form - Adapted for GitHub Pages (mailto)
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const service = document.getElementById('service');
        const message = document.getElementById('message');
        
        const nameValidation = document.getElementById('nameValidation');
        const emailValidation = document.getElementById('emailValidation');
        const phoneValidation = document.getElementById('phoneValidation');

        // Reset validation
        nameValidation.textContent = '';
        emailValidation.textContent = '';
        phoneValidation.textContent = '';

        if (!name.value.trim()) {
            nameValidation.textContent = 'Por favor, insira seu nome.';
            nameValidation.className = 'form-validation error';
            isValid = false;
        }

        if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            emailValidation.textContent = 'Por favor, insira um e-mail válido.';
            emailValidation.className = 'form-validation error';
            isValid = false;
        }

        if (!phone.value.trim()) {
            phoneValidation.textContent = 'Por favor, insira seu telefone.';
            phoneValidation.className = 'form-validation error';
            isValid = false;
        }

        if (!isValid) return;

        // Create mailto link
        const subject = encodeURIComponent('Solicitação de Orçamento - ' + (service.value || 'Geral'));
        const body = encodeURIComponent(
            `Nome: ${name.value}\n` +
            `E-mail: ${email.value}\n` +
            `Telefone: ${phone.value}\n` +
            `Serviço: ${service.value || 'Não especificado'}\n\n` +
            `Mensagem:\n${message.value || 'Nenhuma mensagem adicional.'}`
        );
        
        const mailtoLink = `mailto:sandromelo@gicengenharia.com.br?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        alert('Seu cliente de e-mail será aberto para enviar a mensagem. Se não abrir automaticamente, entre em contato pelo telefone (81) 2150-1452.');
        
        // Reset form
        contactForm.reset();
    });

    // Careers Form - Adapted for GitHub Pages (mailto)
    const careersForm = document.getElementById("careersForm");
    if (careersForm) {
        careersForm.addEventListener("submit", function(e) {
            e.preventDefault();

            // Basic validation
            let isValid = true;
            const nameInput = document.getElementById("careersName");
            const emailInput = document.getElementById("careersEmail");
            const phoneInput = document.getElementById("careersPhone");
            const positionInput = document.getElementById("careersPosition");
            const messageInput = document.getElementById("careersMessage");
            const resumeInput = document.getElementById("careersResume");

            const nameValidation = document.getElementById("careersNameValidation");
            const emailValidation = document.getElementById("careersEmailValidation");
            const phoneValidation = document.getElementById("careersPhoneValidation");
            const resumeValidation = document.getElementById("careersResumeValidation");

            // Clear previous messages
            nameValidation.textContent = "";
            emailValidation.textContent = "";
            phoneValidation.textContent = "";
            resumeValidation.textContent = "";

            if (!nameInput.value.trim()) {
                nameValidation.textContent = "Por favor, insira seu nome.";
                nameValidation.className = "form-validation error";
                isValid = false;
            }

            if (!emailInput.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
                emailValidation.textContent = "Por favor, insira um e-mail válido.";
                emailValidation.className = "form-validation error";
                isValid = false;
            }

            if (!phoneInput.value.trim()) {
                phoneValidation.textContent = "Por favor, insira seu telefone.";
                phoneValidation.className = "form-validation error";
                isValid = false;
            }

            if (resumeInput.files.length > 0) {
                const file = resumeInput.files[0];
                const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
                if (!allowedTypes.includes(file.type)) {
                    resumeValidation.textContent = "Apenas arquivos PDF, DOC e DOCX são permitidos.";
                    resumeValidation.className = "form-validation error";
                    isValid = false;
                } else if (file.size > 5 * 1024 * 1024) { // 5MB limit
                    resumeValidation.textContent = "O arquivo é muito grande (máx. 5MB).";
                    resumeValidation.className = "form-validation error";
                    isValid = false;
                }
            }

            if (!isValid) {
                return;
            }

            // Create mailto link for careers
            const subject = encodeURIComponent('Candidatura - ' + (positionInput.value || 'Vaga Geral'));
            const body = encodeURIComponent(
                `Nome: ${nameInput.value}\n` +
                `E-mail: ${emailInput.value}\n` +
                `Telefone: ${phoneInput.value}\n` +
                `Área de Interesse: ${positionInput.value || 'Não especificada'}\n\n` +
                `Mensagem:\n${messageInput.value || 'Nenhuma mensagem adicional.'}\n\n` +
                `Observação: Currículo anexado separadamente.`
            );
            
            const mailtoLink = `mailto:rh@gicengenharia.com.br?subject=${subject}&body=${body}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            alert('Seu cliente de e-mail será aberto para enviar a candidatura. Não esqueça de anexar seu currículo! Se não abrir automaticamente, envie para: rh@gicengenharia.com.br');
            
            // Reset form
            careersForm.reset();
        });
    }

    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
            }
        });
    });

    // Keyboard navigation for accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            closeLightbox();
        }
    });

    // Performance optimization: Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add loading animation to buttons
    function addLoadingToButton(button) {
        const btnText = button.querySelector('.btn-text');
        const loading = button.querySelector('.loading');
        
        if (btnText && loading) {
            btnText.style.display = 'none';
            loading.style.display = 'inline-block';
            button.disabled = true;
            
            setTimeout(() => {
                btnText.style.display = 'inline-block';
                loading.style.display = 'none';
                button.disabled = false;
            }, 2000);
        }
    }
});

