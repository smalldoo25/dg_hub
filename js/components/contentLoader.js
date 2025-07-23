// js/components/contentLoader.js
import { menuData } from '../data/menuData.js';
import { attachDynamicEventListeners } from '../main.js'; // To be defined in main.js later

const contentArea = document.getElementById('content-area');

// Function to solely update the content area based on contentId
export function updateContentArea(contentId, highlightTerm = null) {
    let foundContent = false;
    let contentToLoad = '';

    if (contentId === 'sitemap') {
        contentToLoad = generateSitemapContent();
        foundContent = true;
    } else {
        for (const key in menuData) {
            const menu = menuData[key];
            const item = menu.subItems.find(sub => sub.id === contentId);
            if (item) {
                contentToLoad = item.content;
                foundContent = true;
                break;
            }
        }
    }

    if (foundContent) {
        if (highlightTerm) {
            const regex = new RegExp(`(${highlightTerm})`, 'gi');
            contentToLoad = contentToLoad.replace(regex, '<span class="highlight">$1</span>');
        }
        contentArea.innerHTML = contentToLoad;
        attachDynamicEventListeners(); // Attach listeners after content is loaded
    } else {
        contentArea.innerHTML = '<h3>Content Not Found</h3><p>The requested content could not be loaded.</p>';
    }
}

// Function to dynamically generate sitemap content
export function generateSitemapContent() {
    let sitemapHtml = '<h3>Sitemap</h3><div class="sitemap-list">';

    for (const menuKey in menuData) {
        if (menuKey === 'utility') continue;

        const menu = menuData[menuKey];
        sitemapHtml += `<h4>${menu.title}</h4><ul>`;
        menu.subItems.forEach(item => {
            if (menuKey === 'legal' && item.id === 'sitemap') {
                return;
            }
            if (menuKey === 'utility' && item.id === 'registration-page') {
                return;
            }
            sitemapHtml += `<li><a href="#" class="sitemap-link" data-menu="${menuKey}" data-content="${item.id}">${item.text}</a></li>`;
        });
        sitemapHtml += `</ul>`;
    }
    sitemapHtml += '</div>';
    return sitemapHtml;
}