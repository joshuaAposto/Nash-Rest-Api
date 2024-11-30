// Sidebar and theme functionality
document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const elements = {
        menuButton: document.getElementById('menuButton'),
        sidebar: document.getElementById('sidebar'),
        overlay: document.getElementById('overlay'),
        themeToggle: document.getElementById('themeToggle'),
        html: document.documentElement
    };

    // Initialize theme
    initializeTheme(elements.html);

    // Event listeners
    setupSidebarListeners(elements);
    setupThemeToggle(elements.themeToggle, elements.html);
});

// Theme initialization
function initializeTheme(html) {
    const savedTheme = localStorage.getItem('color-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }
}

// Sidebar event listeners
function setupSidebarListeners({ menuButton, sidebar, overlay }) {
    // Toggle sidebar
    menuButton.addEventListener('click', () => {
        sidebar.classList.toggle('-translate-x-full');
        overlay.classList.toggle('hidden');
    });

    // Close sidebar on overlay click
    overlay.addEventListener('click', () => {
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
    });

    // Close sidebar on window resize if screen becomes larger
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            sidebar.classList.remove('-translate-x-full');
            overlay.classList.add('hidden');
        }
    });
}

// Theme toggle functionality
function setupThemeToggle(themeToggle, html) {
    themeToggle.addEventListener('click', () => {
        html.classList.toggle('dark');
        localStorage.setItem('color-theme', 
            html.classList.contains('dark') ? 'dark' : 'light'
        );
    });
}
