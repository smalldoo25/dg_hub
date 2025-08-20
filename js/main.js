
//  js/main.js


import { loadMainContent, loadSubMenu } from './components/dynamicContent.js';
import { performSearch } from './components/search.js';


// Get references to DOM elements
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const footerLinks = document.querySelectorAll('.footer-link');
const utilityLinks = document.querySelectorAll('.utility-link');
const logoLink = document.getElementById('logo-link');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');

// Event listener for top navigation links
navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        navLinks.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
        const menuKey = this.getAttribute('data-menu');
        loadMainContent(menuKey);
        loadSubMenu(menuKey);
    });
});

// Event listener for utility and footer links
[...utilityLinks, ...footerLinks, logoLink].forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const contentId = this.getAttribute('data-content') || 'home';
        navLinks.forEach(nav => nav.classList.remove('active'));

        loadMainContent(contentId);
        loadSubMenu(contentId);

        const topNavLink = document.querySelector(`[data-menu="${contentId}"]`);
        if (topNavLink) {
            topNavLink.classList.add('active');
        } else {
            // Note: This logic seems flawed.
            // If the link is not in the top menu, this selector will fail.
            // Consider if a special active state is needed for utility links.
            // document.querySelector(`[data-content="${contentId}"]`).classList.add('active');
        }
    });
});

// Update the search event listener to call the imported function
searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const query = searchInput.value;
    if (!query.trim()) {
        alert('Please enter a search term.');
        return;
    }
    performSearch(query); // Call the search function here
});

// Initial page load
document.addEventListener('DOMContentLoaded', () => {
    loadMainContent('home');
    loadSubMenu('home');
    const homeNavLink = document.querySelector('[data-menu="home"]');
    if (homeNavLink) {
        homeNavLink.classList.add('active');
    }
});