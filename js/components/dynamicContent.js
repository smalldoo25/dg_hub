// dynamicContent.js

import { menuData } from '../data/menuData.js';
import { bindDynamicLinks, findContent, handleFormSubmissions, generateSitemap } from './utils.js';

// Get references to DOM elements
const contentArea = document.getElementById('content-area');
const sidebar = document.getElementById('sidebar');
const sidebarTitle = document.getElementById('sidebar-title');
const sidebarNav = sidebar.querySelector('.sidebar-nav');
const metaDescriptionTag = document.querySelector('meta[name="description"]');
const canonicalLinkTag = document.querySelector('link[rel="canonical"]');

let currentLoadedContentId = null;

// Function to load main content and update the page
export function loadMainContent(menuKey) {
    const item = menuData[menuKey];
    if (!item || currentLoadedContentId === menuKey) {
        return;
    }

    let contentHTML = item.content;

    // Special case for the sitemap page
    if (menuKey === 'sitemap') {
        contentHTML = generateSitemap(menuData);
    }
    
    contentArea.innerHTML = contentHTML;
    document.title = item.pageTitle;
    metaDescriptionTag.setAttribute('content', item.metaDescription);
    canonicalLinkTag.setAttribute('href', item.canonicalUrl);
    
    currentLoadedContentId = menuKey;
    handleFormSubmissions();
    bindDynamicLinks();
}

// Function to load and manage the sidebar
export function loadSubMenu(menuKey) {
    sidebarNav.innerHTML = '';
    const data = menuData[menuKey];

    if (data && (data.subItems || data.groups)) {
        sidebar.classList.add('show');
        sidebarTitle.textContent = data.title;
        sidebarTitle.setAttribute('data-content', menuKey);
        sidebarTitle.classList.add('active');

        const addSubMenuLink = (item, isGroupTitle = false) => {
            const link = document.createElement('a');
            link.classList.add('nav-link', 'rounded-corners');
            if (isGroupTitle) {
                link.classList.add('group-title-link');
            }
            link.href = `#${item.id}`;
            link.textContent = item.text || item.groupTitle;

            link.addEventListener('click', function (event) {
                event.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    sidebarNav.querySelectorAll('.nav-link').forEach(subLink => {
                        subLink.classList.remove('active');
                    });
                    sidebarTitle.classList.remove('active');
                    this.classList.add('active');
                } else {
                    console.error(`Element with ID "${targetId}" not found for scrolling.`);
                }
            });
            sidebarNav.appendChild(link);
        };

        if (data.groups) {
            data.groups.forEach(group => {
                addSubMenuLink({ id: group.id, groupTitle: group.groupTitle }, true);
                group.subItems.forEach(item => {
                    addSubMenuLink(item);
                });
            });
        } else if (data.subItems) {
            data.subItems.forEach(item => {
                addSubMenuLink(item);
            });
        }
    } else {
        sidebar.classList.remove('show');
        sidebarTitle.classList.remove('active');
    }
}