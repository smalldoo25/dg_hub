// js/main.js
// Import functions from other modules
import { activateMenuItem, setupNavigationListeners } from './components/navigation.js';
import { updateContentArea, generateSitemapContent } from './components/contentLoader.js';
import { setupSearch } from './components/search.js';

// Re-export attachDynamicEventListeners for use in contentLoader.js
// This breaks a circular dependency where contentLoader needs auth, and auth needs contentLoader
export { attachDynamicEventListeners } from './components/auth.js';


const footerLinks = document.querySelectorAll('.footer-link');
const utilityLinks = document.querySelectorAll('.utility-link');
const contentArea = document.getElementById('content-area'); // Already defined, but good for clarity

// Initial setup on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    setupNavigationListeners(); // Setup event listeners for top nav and logo
    setupSearch(); // Setup search form listener
    // Initial load: Simulate clicking the 'Home' link
    activateMenuItem('home');
});

// Event delegation for dynamically generated sitemap links and search result links
contentArea.addEventListener('click', function (event) {
    if (event.target.classList.contains('sitemap-link')) {
        event.preventDefault();
        const menuKey = event.target.getAttribute('data-menu');
        const contentId = event.target.getAttribute('data-content');
        activateMenuItem(menuKey, contentId);
    } else if (event.target.classList.contains('search-result-link')) {
        event.preventDefault();
        const menuKey = event.target.getAttribute('data-menu');
        const contentId = event.target.getAttribute('data-content');
        const highlightTerm = event.target.getAttribute('data-highlight');
        activateMenuItem(menuKey, contentId, highlightTerm);
    }
    // Specific event listeners for register/login buttons that update contentArea
    // These are handled by attachDynamicEventListeners, but due to their global nature
    // and frequent re-attachment, they are here for clarity.
    // However, for forms that are dynamically loaded, the listeners MUST be attached
    // inside attachDynamicEventListeners.
    // The previous implementation of these specific buttons (registerButton, goToLoginButton)
    // was already using delegation inside attachDynamicEventListeners, so this external one is removed.
});


// Event listener for footer links (Privacy Policy, Terms of Service, Sitemap)
footerLinks.forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        const contentId = this.getAttribute('data-content-id');

        if (contentId === 'sitemap') {
            updateContentArea(contentId);
            document.querySelectorAll('.navbar-nav .nav-link').forEach(navLink => navLink.classList.remove('active'));
            document.getElementById('sidebar').classList.remove('show');
        } else {
            updateContentArea(contentId);
            document.querySelectorAll('.navbar-nav .nav-link').forEach(navLink => navLink.classList.remove('active'));
            document.getElementById('sidebar').classList.remove('show');
        }
    });
});

// Event listener for Utility links (Login, Help)
utilityLinks.forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        const contentId = this.getAttribute('data-content-id');
        updateContentArea(contentId);
        document.querySelectorAll('.navbar-nav .nav-link').forEach(navLink => navLink.classList.remove('active'));
        document.getElementById('sidebar').classList.remove('show');
    });
});