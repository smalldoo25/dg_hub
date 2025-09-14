// main.js

import {
    menuData
} from './data/menuData.js';
import {
    loadMainContent,
    loadSubMenu,
    hideAllContentSections,
    showContentSection,
    showAllSubItemsInGroup
} from './components/dynamicContent.js';
import {
    findContent,
    addNavigationLinks,
    populateDropdownMenu
} from './components/utils.js';
import {
    performSearch
} from './components/search.js';


function handleLinkClick(contentId) {
    const contentInfo = findContent(contentId, menuData);
    if (!contentInfo) {
        console.error(`Content ID "${contentId}" not found.`);
        return;
    }
    const parentMenu = contentInfo.parentKey;

    // Load the main content layout (e.g., "Products" page template)
    loadMainContent(parentMenu);

    // Hide all sections to start with a clean slate
    hideAllContentSections();

    // Show content based on the type of link clicked
    if (contentInfo.isGroup) {
        // Case 1: A group is clicked. Show its container and all its sub-items.
        showContentSection(contentId);
        showAllSubItemsInGroup(contentId);
        addNavigationLinks(parentMenu, contentId, null, menuData, findContent); // No current sub-item selected
        loadSubMenu(parentMenu, contentId);
    } else if (contentInfo.groupParent) {
        // Case 2: A sub-item within a group is clicked.
        showContentSection(contentInfo.groupParent); // Show the group container
        showContentSection(contentId); // Show only the specific sub-item's content
        addNavigationLinks(parentMenu, contentInfo.groupParent, contentId, menuData, findContent);
        loadSubMenu(parentMenu, contentInfo.groupParent);
    } else {
        // Case 3: A main page link is clicked.
        loadSubMenu(parentMenu);
    }

    // Smooth scroll to the content
    setTimeout(() => {
        const targetElement = document.getElementById(contentId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }, 150);
}


// Initial page load and setup
document.addEventListener('DOMContentLoaded', () => {
    // A list of all main menu items with a dropdown
    const dropdownMenus = ['products', 'productsAnalyticsAI'];

    // Loop through and populate each dropdown menu
    dropdownMenus.forEach(menuKey => {
        populateDropdownMenu(menuKey, menuData);
    });

    // Set up the main navigation listeners
    document.querySelectorAll('.navbar-nav a, .utility-link, .footer-link, #logo-link').forEach(link => {
        link.addEventListener('click', function (event) {
            const parentLi = this.closest('li');
            const menuKey = parentLi ? parentLi.getAttribute('data-menu') : (this.getAttribute('data-content') || 'home');

            if (this.classList.contains('dropdown-toggle')) {
                document.querySelectorAll('.navbar-nav .nav-item').forEach(item => item.classList.remove('active'));
                parentLi.classList.add('active');
                return;
            }

            event.preventDefault();
            handleLinkClick(menuKey);
        });
    });


    // Get element references
    const contentArea = document.getElementById('content-area');
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');

    //for search
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            performSearch(query, menuData, contentArea, searchInput);
        } else {
            alert('Please enter a search term.');
        }
    });

    // Add a function to handle search results click
    function handleSearchResultClick(contentId) {
        // Treat search results like a main page load
        loadMainContent(contentId);
        // Hide the sidebar since search results don't have a sub-menu
        sidebar.classList.remove('show');

        // Optionally, update the URL for a cleaner history
        // history.pushState({ contentId: contentId }, '', `/search?q=${contentId}`);
    }


    // This single, robust event listener handles all navigation links.
    document.addEventListener('click', function (event) {
        const link = event.target.closest('a[data-content]');

        // Check if the clicked element is a link with a data-content attribute
        // and is not a dropdown toggle.
        if (link && !link.classList.contains('dropdown-toggle')) {
            event.preventDefault();
            const contentId = link.getAttribute('data-content');
            handleLinkClick(contentId);
        }
    });


    // Handle scroll-to-top button visibility
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
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

//copyright when copied text
document.addEventListener('copy', function (e) {
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