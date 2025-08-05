// js/components/menuManager.js

import { handleMenuClick, handleSubMenuClick, handleUtilityLinkClick, handleLogoClick, handleSidebarTitleClick, loadContent, updateSidebar, findContentById, handleSitemapClick } from './contentLoader.js';
import { menuData, utilityData } from '../data/menuData.js';
import { handleSearch, attachSearchResultListener } from './search.js';

export function initializeMenu() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sidebarNav = document.querySelector('.sidebar-nav');
    const sidebarTitle = document.getElementById('sidebar-title');
    const utilityLinks = document.querySelectorAll('.utility-link, .footer-link');
    const logoLink = document.getElementById('logo-link');
    const searchForm = document.getElementById('searchForm');
    const contentArea = document.getElementById('content-area');

    // Attach event listeners for top navigation menu
    navLinks.forEach(link => {
        link.addEventListener('click', handleMenuClick);
    });

    // Attach event listeners for sidebar sub-menu
    sidebarNav.addEventListener('click', handleSubMenuClick);
    sidebarTitle.addEventListener('click', handleSidebarTitleClick);

    // Attach event listeners for utility links
    utilityLinks.forEach(link => {
        link.addEventListener('click', handleUtilityLinkClick);
    });

    // Attach listener for logo link
    logoLink.addEventListener('click', handleLogoClick);

    // Attach event listener for search form
    searchForm.addEventListener('submit', handleSearch);

    // Attach listener for search results to be clickable
    attachSearchResultListener();
    
    // Attach listener for sitemap links
    contentArea.addEventListener('click', (event) => {
        if (event.target.closest('.sitemap-list a')) {
            event.preventDefault();
            handleSitemapClick(event);
        }
    });

    // Add popstate listener to handle browser back/forward buttons
    window.addEventListener('popstate', (event) => {
        const state = event.state;
        if (state) {
            if (state.menu) {
                const { page, menuKey, contentId } = findContentById(state.contentId || state.menu);

                loadContent(page);
                updateSidebar(menuKey, contentId);

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-menu') === menuKey) {
                        link.classList.add('active');
                    }
                });
            } else if (state.utility) {
                const page = utilityData[state.utility];
                loadContent(page);
                document.getElementById('sidebar').classList.remove('show');
                navLinks.forEach(link => link.classList.remove('active'));
            } else if (state.search) {
                 searchInput.value = state.search;
                 searchForm.dispatchEvent(new Event('submit', { bubbles: true }));
            }
        } else {
            handleLogoClick(event);
        }
    });

    // Initial load logic based on URL hash
    const initialHash = window.location.hash.substring(1);
    if (initialHash) {
        const pathParts = initialHash.split('/');
        const menuKey = pathParts[0];
        const contentId = pathParts[1] || menuKey;
        const pageData = findContentById(contentId);

        if (pageData) {
            loadContent(pageData.page);
            updateSidebar(pageData.menuKey, pageData.contentId);
            document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-menu') === pageData.menuKey) {
                    link.classList.add('active');
                }
            });
        } else {
            const utilityPage = utilityData[initialHash];
            if (utilityPage) {
                loadContent(utilityPage);
                document.getElementById('sidebar').classList.remove('show');
                navLinks.forEach(link => link.classList.remove('active'));
            } else {
                handleLogoClick(event);
            }
        }
    } else {
        const initialPage = menuData.home;
        loadContent(initialPage);
        updateSidebar('home');
    }
}