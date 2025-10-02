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
    populateDropdownMenu,
    findContentByUrl
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

    // Old: Update the URL in the address bar using History API (which breaks on reload)
    // const newUrl = contentInfo.canonicalUrl || `/${contentId}`;
    // history.pushState({ contentId: contentId }, '', newUrl);

    // New: Update the URL using hash (The browser ignores the hash on reload)
    // const newHash = contentInfo.canonicalUrl || `#/${contentId}`;
    // window.location.hash = newHash;

    // *** REMOVE THE URL MANIPULATION HERE ***
    // (You no longer want to call history.pushState or set window.location.hash here)
    // REMOVE THIS SECTION:
    /*
    const newHash = contentInfo.canonicalUrl || `#/${contentId}`;
    window.location.hash = newHash; // OR history.pushState
    */
    // ****************************************



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
    const dropdownMenus = ['products', 'productsAnalyticsAI', 'uiUxAnalyticsMetrics', 'hypothesisDriven'];

    // Loop through and populate each dropdown menu
    dropdownMenus.forEach(menuKey => {
        populateDropdownMenu(menuKey, menuData);
    });

    // // Set up the main navigation listeners
    // document.querySelectorAll('.navbar-nav a, .utility-link, .footer-link, #logo-link').forEach(link => {
    //     link.addEventListener('click', function (event) {
    //         const parentLi = this.closest('li');
    //         const menuKey = parentLi ? parentLi.getAttribute('data-menu') : (this.getAttribute('data-content') || 'home');

    //         if (this.classList.contains('dropdown-toggle')) {
    //             document.querySelectorAll('.navbar-nav .nav-item').forEach(item => item.classList.remove('active'));
    //             parentLi.classList.add('active');
    //             return;
    //         }

    //         event.preventDefault();
    //         handleLinkClick(menuKey);
    //     });
    // });


    // Note: This listener is primarily for setting the 'active' class on the top nav <li>.
    // // The content loading will be handled by the global listener (below this block).
    // document.querySelectorAll('.navbar-nav a').forEach(link => {
    //     link.addEventListener('click', function (event) {
    //         const parentLi = this.closest('li.nav-item');

    //         // 1. If it's a dropdown toggle, only set the active class and exit (let Bootstrap handle the menu)
    //         if (this.classList.contains('dropdown-toggle')) {
    //             document.querySelectorAll('.navbar-nav .nav-item').forEach(item => item.classList.remove('active'));
    //             if (parentLi) {
    //                 parentLi.classList.add('active');
    //             }
    //             // Allow Bootstrap's dropdown JS to run
    //             return;
    //         }

    //         // 2. For all other main nav links, just set the active class.
    //         // The global listener handles the event.preventDefault() and handleLinkClick().
    //         document.querySelectorAll('.navbar-nav .nav-item').forEach(item => item.classList.remove('active'));
    //         if (parentLi) {
    //             parentLi.classList.add('active');
    //         }
    //     });
    // });


    // REPLACE the existing 'document.querySelectorAll('.navbar-nav a')' block with this.
    document.querySelectorAll('.navbar-nav a').forEach(link => {
        link.addEventListener('click', function (event) {
            const parentLi = this.closest('li.nav-item');

            // 1. If it's a dropdown toggle, only set the active class and exit.
            if (this.classList.contains('dropdown-toggle')) {
                document.querySelectorAll('.navbar-nav .nav-item').forEach(item => item.classList.remove('active'));
                if (parentLi) {
                    parentLi.classList.add('active');
                }
                return;
            }

            // 2. For all other main nav links (Home, Services, etc.):
            // Set the active class before content loads
            document.querySelectorAll('.navbar-nav .nav-item').forEach(item => item.classList.remove('active'));
            if (parentLi) {
                parentLi.classList.add('active');
            }

            // We DO NOT call event.preventDefault() here.
            // We rely on the GLOBAL LISTENER to see the 'data-content' attribute,
            // call event.preventDefault(), and then call handleLinkClick().
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



    // // This single, robust event listener handles all navigation links.
    // document.addEventListener('click', function (event) {
    //     const link = event.target.closest('a[data-content]');

    //     // Check if the clicked element is a link with a data-content attribute
    //     // and is not a dropdown toggle.
    //     if (link && !link.classList.contains('dropdown-toggle')) {
    //         event.preventDefault();
    //         const contentId = link.getAttribute('data-content');
    //         // This is where the core logic lives.
    //         handleLinkClick(contentId);
    //     }
    // });

    // // We must also ensure your global click listener is active and correct (around line 130):
    // document.addEventListener('click', function (event) {
    //     const link = event.target.closest('a[data-content]');
    //     if (link && !link.classList.contains('dropdown-toggle')) {
    //         // This is where the event is canceled and content is loaded.
    //         event.preventDefault();
    //         const contentId = link.getAttribute('data-content');
    //         handleLinkClick(contentId);
    //     }
    // });







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



// // This new function handles routing on page load and URL changes.
// function handleRouting() {
//     const path = new URL(window.location.href).pathname;

//     if (path === '/') {
//         // Explicitly load the default page
//         handleLinkClick('home');
//         return;
//     }

//     const contentInfo = findContentByUrl(window.location.href, menuData);

//     if (contentInfo) {
//         // Load the content based on the URL
//         handleLinkClick(contentInfo.id);
//     } else {
//         // Default to a home page or 404
//         handleLinkClick('home');
//     }
// }

// New function to map hash path to a content ID
function getHashPathId() {
    // window.location.hash starts with # (e.g., #/downloads)
    const hashPath = window.location.hash.substring(1); 
    
    // 1. Check for home page (empty hash or just '/')
    if (!hashPath || hashPath === '/') {
        return 'home';
    }

    // 2. Try to find content by the hash path
    // We can't use findContentByUrl directly because it expects a full URL/canonicalUrl
    // Instead, you'll need a simple utility to parse the hash path to an ID.
    // Assuming your ID structure is simple (e.g., #/downloads maps to 'downloads' ID)
    const parts = hashPath.split('/');
    const contentId = parts[parts.length - 1]; // Use the last part of the path as the ID

    // You might need a more complex lookup here if the ID doesn't match the last path segment.
    // For now, let's just return the last segment and rely on findContent in handleLinkClick.
    return contentId; 
}

// Function to handle all routing events (initial load and hash changes)
function handleRouting() {
    const contentId = getHashPathId();
    
    // Check if a valid ID was found before calling handleLinkClick
    if (contentId) {
        handleLinkClick(contentId);
    } else {
        // Fallback if the hash path is unparsable
        handleLinkClick('home');
    }
}

// --- Event Listeners ---

// 1. Initial Page Load and all future hash changes
window.addEventListener('hashchange', handleRouting);

// 2. DOMContentLoaded to set up listeners and run initial route
document.addEventListener('DOMContentLoaded', () => {
    // ... (all other setup code: dropdowns, search, scroll-to-top) ...

    // After setting up all listeners, run the initial route check
    handleRouting();
});

// 3. Update the global click listener to ONLY update the hash.
document.addEventListener('click', function (event) {
    const link = event.target.closest('a[data-content]');
    if (link && !link.classList.contains('dropdown-toggle')) {
        event.preventDefault();
        const contentId = link.getAttribute('data-content');
        
        // Use findContent to get the canonical URL (with hash)
        const contentInfo = findContent(contentId, menuData);
        if (contentInfo) {
            const newHash = contentInfo.canonicalUrl || `#/${contentId}`;
            // This triggers the 'hashchange' listener, which calls handleRouting -> handleLinkClick
            window.location.hash = newHash; 
        }
    }
});



// // This new function handles routing on page load and URL changes.
// function handleRouting() {
//     // Use the hash fragment for routing
//     const pathWithHash = window.location.hash.substring(1); // Removes the leading '#'

//     // Construct a fake URL for findContentByUrl to parse the path
//     const fakeUrl = `https://deftagile.com/${pathWithHash}`;

//     // If no hash exists (initial load), default to 'home'
//     if (!pathWithHash) {
//         handleLinkClick('home');
//         return;
//     }

//     const contentInfo = findContentByUrl(fakeUrl, menuData);

//     if (contentInfo) {
//         handleLinkClick(contentInfo.id);
//     } else {
//         // Fallback for an unknown hash path (e.g., #/unknown)
//         handleLinkClick('home');
//     }
// }



// Add event listeners for back/forward navigation
window.addEventListener('popstate', handleRouting);

// // Call the router when the page loads
// document.addEventListener('DOMContentLoaded', () => {
//     // ... all other existing DOMContentLoaded code ...
//     handleRouting();
// });