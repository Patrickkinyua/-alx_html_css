// Navigation scroll behavior
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                navLinks.classList.remove('active');
            }
        });
    });

    // Active section highlighting
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    const observerOptions = {
        threshold: 0.3,
        rootMargin: "-50px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
});

// Project data with Unsplash tech-related images
const projects = [
    {
        title: 'Modern Web Application',
        description: 'A full-stack web application built with modern technologies, featuring responsive design and real-time updates.',
        image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        tags: ['React.js', 'Node.js', 'MongoDB', 'REST API'],
        link: '#'
    },
    {
        title: 'E-commerce Platform',
        description: 'Feature-rich e-commerce solution with secure payment integration and inventory management.',
        image: 'https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        tags: ['JavaScript', 'Express.js', 'PostgreSQL', 'Stripe API'],
        link: '#'
    },
    {
        title: 'AI-Powered Analytics Dashboard',
        description: 'Interactive dashboard with data visualization and machine learning insights.',
        image: 'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        tags: ['Python', 'TensorFlow', 'D3.js', 'Flask'],
        link: '#'
    }
];

// Populate projects with animation
const projectGrid = document.querySelector('.project-grid');
projects.forEach((project, index) => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.style.opacity = '0';
    projectCard.style.transform = 'translateY(20px)';
    projectCard.innerHTML = `
        <div class="project-image">
            <img src="${project.image}" alt="${project.title}">
            <div class="project-overlay">
                <a href="${project.link}" class="project-link" target="_blank">View Project</a>
            </div>
        </div>
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
            </div>
        </div>
    `;
    projectGrid.appendChild(projectCard);

    // Animate project cards
    setTimeout(() => {
        projectCard.style.transition = 'all 0.6s ease';
        projectCard.style.opacity = '1';
        projectCard.style.transform = 'translateY(0)';
    }, 100 * index);
});

// Add project card styles
const style = document.createElement('style');
style.textContent = `
    .project-card {
        background: white;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
    }

    .project-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    }

    .project-image {
        position: relative;
        overflow: hidden;
        height: 200px;
    }

    .project-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    .project-card:hover .project-image img {
        transform: scale(1.1);
    }

    .project-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(37, 99, 235, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .project-card:hover .project-overlay {
        opacity: 1;
    }

    .project-content {
        padding: 1.5rem;
    }

    .project-content h3 {
        color: var(--text-color);
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
    }

    .project-content p {
        color: #6b7280;
        font-size: 0.9rem;
        margin-bottom: 1rem;
    }

    .project-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .project-tags span {
        background: var(--accent-color);
        color: var(--primary-color);
        padding: 0.25rem 0.75rem;
        border-radius: 15px;
        font-size: 0.8rem;
    }

    .project-link {
        color: white;
        text-decoration: none;
        padding: 0.75rem 1.5rem;
        border: 2px solid white;
        border-radius: 25px;
        font-weight: 500;
        transition: all 0.3s ease;
    }

    .project-link:hover {
        background: white;
        color: var(--primary-color);
    }
`;

document.head.appendChild(style);

// Contact form handling with validation and animation
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
        alert('Please fill in all fields');
        return;
    }

    if (!isValidEmail(formData.email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Simulate form submission
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Form submitted:', formData);
    
    // Reset form and button
    contactForm.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
    
    // Show success message
    showNotification('Thank you for your message! I will get back to you soon.');
});

// Email validation helper
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Notification helper
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            animation: slideIn 0.3s ease, slideOut 0.3s ease 3s forwards;
            z-index: 1000;
        }

        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
        style.remove();
    }, 3500);
} 