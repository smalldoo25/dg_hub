
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

//up arrow button scrolling
// Get the button element
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// When the user scrolls down 100px from the top of the document, show the button
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // For a smooth scrolling effect
  });
});










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

// disable the functionalities for various activities
document.addEventListener('contextmenu', event => event.preventDefault());

document.addEventListener('keydown', e => {
    // Disable Ctrl+U
    if (e.ctrlKey && e.key === 'u' || e.ctrlKey && e.key === 'U') {
        e.preventDefault();
    }
    // Disable F12
    if (e.key === 'F12') {
        e.preventDefault();
    }
});

document.addEventListener('copy', event => {
    event.preventDefault();
});

document.addEventListener('cut', event => {
    event.preventDefault();
});


document.addEventListener('copy', function(e) {
    // Get the text that the user selected
    var selectedText = window.getSelection().toString();
    
    // Create the copyright notice
    var copyrightNotice = '\n\nSource: deftagile.com Website\nCopyright © 2025 DeftAgile. All rights reserved.';
    
    // Combine the selected text and the copyright notice
    var newText = selectedText + copyrightNotice;
    
    // Set the modified text to the clipboard
    e.clipboardData.setData('text/plain', newText);
    
    // Prevent the default copy action
    e.preventDefault();
  });