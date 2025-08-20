// utils.js

// Import menuData from the menuData.js file
import { menuData } from '../data/menuData.js';
import { loadMainContent, loadSubMenu } from './dynamicContent.js'; // You may need to import these if bindDynamicLinks calls them.


// We need to pass menuData to this function since it's in a separate file
export function generateSitemap(menuData) {
    let sitemapHtml = '<h4 id="sitemap">Sitemap</h4><p>This is a complete list of all pages available on our website.</p>';
    sitemapHtml += '<div class="row">';

    for (const menuKey in menuData) {
        if (['login-page', 'help-page'].includes(menuKey)) {
            continue;
        }

        const menu = menuData[menuKey];
        sitemapHtml += `<div class="col-md-4 mb-4"><h4><a href="#" class="text-decoration-none" data-content="${menuKey}">${menu.title}</a></h4><ul class="list-unstyled">`;

        if (menu.groups) {
            menu.groups.forEach(group => {
                sitemapHtml += `<li><strong><a href="#" class="text-decoration-none" data-content="${group.id}">${group.groupTitle}</a></strong><ul class="list-unstyled ms-3">`;
                group.subItems.forEach(item => {
                    sitemapHtml += `<li><a href="#" class="text-decoration-none" data-content="${item.id}">${item.text}</a></li>`;
                });
                sitemapHtml += '</ul></li>';
            });
        }
        else if (menu.subItems) {
            menu.subItems.forEach(item => {
                sitemapHtml += `<li><a href="#" class="text-decoration-none" data-content="${item.id}">${item.text}</a></li>`;
            });
        }
        sitemapHtml += '</ul></div>';
    }

    sitemapHtml += '</div>';
    return sitemapHtml;
}

// Function to handle form submissions
export function handleFormSubmissions() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const messageBox = document.getElementById('contactMessage');
            messageBox.textContent = 'Thank you for your message! We will get back to you shortly.';
            messageBox.classList.remove('error');
            messageBox.classList.add('success');
            messageBox.style.display = 'block';
            contactForm.reset();
        });
    }
}

// Function to bind click listeners to dynamic links
export function bindDynamicLinks() {
    document.querySelectorAll('#content-area a[data-content]').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const contentId = this.getAttribute('data-content');
            
            const parentMenu = findContent(contentId).parentKey || contentId;
            const topNavLink = document.querySelector(`[data-menu="${parentMenu}"]`);
            if (topNavLink) {
                document.querySelectorAll('.navbar-nav .nav-link').forEach(nav => nav.classList.remove('active'));
                topNavLink.classList.add('active');
            } else {
                 document.querySelectorAll('.navbar-nav .nav-link').forEach(nav => nav.classList.remove('active'));
            }

            // Correctly load content based on the ID
            loadMainContent(parentMenu || contentId);
            loadSubMenu(parentMenu || contentId);
            
            if (contentId !== parentMenu) {
                const targetElement = document.getElementById(contentId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Function to find content within menuData
export function findContent(id) {
    if (menuData[id]) {
        return menuData[id];
    }
    for (const menuKey in menuData) {
        const menu = menuData[menuKey];
        if (menu.subItems) {
            const item = menu.subItems.find(sub => sub.id === id);
            if (item) return { ...item, parentKey: menuKey };
        }
        if (menu.groups) {
            for (const group of menu.groups) {
                if (group.id === id) return { ...group, parentKey: menuKey };
                const item = group.subItems.find(sub => sub.id === id);
                if (item) return { ...item, parentKey: menuKey };
            }
        }
    }
    return null;
}