// js/components/navigation.js
import { menuData } from '../data/menuData.js';
import { updateContentArea } from './contentLoader.js';

const sidebar = document.getElementById('sidebar');
const sidebarTitle = document.getElementById('sidebar-title');
const sidebarNav = sidebar.querySelector('.sidebar-nav');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const logoLink = document.getElementById('logo-link');

let activeTopMenu = null; // To keep track of the currently active top menu item

// Function to load sub-menu items into the sidebar
export function loadSubMenu(menuKey) {
    sidebarNav.innerHTML = ''; // Clear existing sub-menu items
    const data = menuData[menuKey];
    if (data) {
        sidebarTitle.textContent = data.title;
        data.subItems.forEach(item => {
            if (menuKey === 'legal' && item.id === 'sitemap') {
                return;
            }
            if (menuKey === 'utility' && item.id === 'registration-page') {
                return;
            }

            const link = document.createElement('a');
            link.classList.add('nav-link', 'rounded-corners');
            link.href = '#';
            link.setAttribute('data-content', item.id);
            link.textContent = item.text;
            sidebarNav.appendChild(link);

            link.addEventListener('click', function (event) {
                event.preventDefault();
                updateContentArea(item.id);
                sidebarNav.querySelectorAll('.nav-link').forEach(subLink => {
                    subLink.classList.remove('active');
                });
                this.classList.add('active');
            });
        });
        sidebar.classList.add('show');
    } else {
        sidebar.classList.remove('show');
    }
}

// Central function to handle activating a top-level menu item
export function activateMenuItem(menuKey, contentIdToLoad = null, highlightTerm = null) {
    navLinks.forEach(navLink => navLink.classList.remove('active'));
    sidebarNav.querySelectorAll('.nav-link').forEach(subLink => {
        subLink.classList.remove('active');
    });

    const targetTopLink = document.querySelector(`.navbar-nav .nav-link[data-menu="${menuKey}"]`);

    if (targetTopLink) {
        targetTopLink.classList.add('active');
        activeTopMenu = menuKey;
        loadSubMenu(menuKey);

        setTimeout(() => {
            let contentFoundAndLoaded = false;
            if (contentIdToLoad) {
                const subItemToLoad = menuData[menuKey]?.subItems.find(item => item.id === contentIdToLoad);
                if (subItemToLoad) {
                    updateContentArea(contentIdToLoad, highlightTerm);
                    const activeSubLink = sidebarNav.querySelector(`.nav-link[data-content="${contentIdToLoad}"]`);
                    if (activeSubLink) {
                        activeSubLink.classList.add('active');
                    }
                    contentFoundAndLoaded = true;
                }
            }

            if (!contentFoundAndLoaded) {
                const firstSubMenuItem = sidebarNav.querySelector('.nav-link');
                if (firstSubMenuItem) {
                    updateContentArea(firstSubMenuItem.getAttribute('data-content'));
                    firstSubMenuItem.classList.add('active');
                } else {
                    updateContentArea('no-sub-items'); // Consider defining this placeholder in menuData or handle gracefully
                }
            }
        }, 100);
    } else {
        sidebar.classList.remove('show');
        activeTopMenu = null;
        updateContentArea(contentIdToLoad || 'content-not-found', highlightTerm);
    }
}

// Attach initial event listeners for top navigation and logo
export function setupNavigationListeners() {
    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const menuKey = this.getAttribute('data-menu');
            activateMenuItem(menuKey);
        });
    });

    logoLink.addEventListener('click', function (event) {
        event.preventDefault();
        activateMenuItem('home');
    });
}