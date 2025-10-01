// components/dynamicContent.js

import { menuData } from '../data/menuData.js';
import { handleFormSubmissions } from './utils.js';

const contentArea = document.getElementById('content-area');
const sidebar = document.getElementById('sidebar');
const sidebarTitle = document.getElementById('sidebar-title');
const sidebarNav = sidebar.querySelector('.sidebar-nav');
const metaDescriptionTag = document.querySelector('meta[name="description"]');
const canonicalLinkTag = document.querySelector('link[rel="canonical"]');

function generateSitemap() {
    let sitemapHtml = '<h4 id="sitemap">Sitemap</h4><p>This is a complete list of all pages available on our website.</p>';
    sitemapHtml += '<div class="row">';

    for (const menuKey in menuData) {
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
        } else if (menu.subItems) {
            menu.subItems.forEach(item => {
                sitemapHtml += `<li><a href="#" class="text-decoration-none" data-content="${item.id}">${item.text}</a></li>`;
            });
        }
        sitemapHtml += '</ul></div>';
    }

    sitemapHtml += '</div>';
    return sitemapHtml;
}

export function loadMainContent(menuKey) {
    const item = menuData[menuKey];
    if (!item) {
        console.error(`Menu key "${menuKey}" not found in menuData.`);
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
    handleFormSubmissions();
}

export function loadSubMenu(menuKey, groupToExpandId = null) {
    sidebarNav.innerHTML = '';
    const data = menuData[menuKey];
    if (data && (data.subItems || data.groups)) {
        sidebar.classList.add('show');
        sidebarTitle.textContent = data.title;
        sidebarTitle.setAttribute('data-content', menuKey);
        if (data.groups) {
            data.groups.forEach(group => {
                const groupId = group.id;
                const groupContainer = document.createElement('div');
                const groupTitleLink = document.createElement('a');
                groupTitleLink.classList.add('nav-link', 'group-title-link', 'rounded-corners');
                groupTitleLink.setAttribute('data-content', groupId);
                groupTitleLink.textContent = group.groupTitle;
                const collapseContent = document.createElement('div');
                collapseContent.classList.add('collapse');
                collapseContent.id = `collapse-${groupId}`;
                if (groupId === groupToExpandId) {
                    collapseContent.classList.add('show');
                }
                // group.subItems.forEach(item => {
                //     const subLink = document.createElement('a');
                //     subLink.classList.add('nav-link', 'rounded-corners');
                //     subLink.href = `#${item.id}`;
                //     subLink.textContent = item.text;
                //     subLink.setAttribute('data-content', item.id);
                //     collapseContent.appendChild(subLink);
                // });

                group.subItems.forEach(item => {
                    const subLink = document.createElement('a');
                    subLink.classList.add('nav-link', 'rounded-corners');
                    subLink.href = `#${item.id}`;
                    // Set the data-content attribute
                    subLink.setAttribute('data-content', item.id);
                    subLink.textContent = item.text;
                    collapseContent.appendChild(subLink);
                });

                groupContainer.appendChild(groupTitleLink);
                groupContainer.appendChild(collapseContent);
                sidebarNav.appendChild(groupContainer);
            });
        } else if (data.subItems) {
            // data.subItems.forEach(item => {
            //     const link = document.createElement('a');
            //     link.classList.add('nav-link', 'rounded-corners');
            //     link.href = `#${item.id}`;
            //     link.textContent = item.text;
            //     link.setAttribute('data-content', item.id);
            //     sidebarNav.appendChild(link);
            // });

            data.subItems.forEach(item => {
                const link = document.createElement('a');
                link.classList.add('nav-link', 'rounded-corners');
                link.href = `#${item.id}`;
                // Set the data-content attribute
                link.setAttribute('data-content', item.id);
                link.textContent = item.text;
                sidebarNav.appendChild(link);
            });

        }
    } else {
        sidebar.classList.remove('show');
    }

    setTimeout(() => {
        document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => link.classList.remove('active'));
        document.querySelectorAll('.sidebar-heading').forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.sidebar-nav a[data-content="${groupToExpandId}"]`) ||
            document.querySelector(`.sidebar-nav a[data-content="${menuKey}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }, 150);
}

// Add to the top of the file
export function showAllSubItemsInGroup(groupId) {
    document.querySelectorAll(`section[data-group-id="${groupId}"] section[data-subitem-id]`).forEach(el => {
        el.style.display = 'block';
    });
}

// Update this function to handle all special cases
export function hideAllContentSections() {
    document.querySelectorAll('section[data-group-id], section[data-subitem-id], section[data-introduction-id], section[data-conclusion-id]').forEach(el => {
        el.style.display = 'none';
    });
}

// Update this function to handle all special cases
export function showContentSection(contentId) {
    const contentSection = document.querySelector(`section[data-group-id="${contentId}"], section[data-subitem-id="${contentId}"], section[data-introduction-id="${contentId}"], section[data-conclusion-id="${contentId}"]`);
    if (contentSection) {
        contentSection.style.display = 'block';
    }
}

// Add this new function
export function showSubItemContent(subItemId) {
    document.querySelectorAll('.sub-item-content').forEach(el => {
        el.style.display = 'none';
    });
    const subItemSection = document.getElementById(subItemId);
    if (subItemSection) {
        subItemSection.style.display = 'block';
    }
}

export function hideAllGroups() {
    document.querySelectorAll('section[data-group-id]').forEach(section => {
        section.style.display = 'none';
    });
}



export function showGroupContent(groupId) {
    hideAllGroups();
    const groupSection = document.querySelector(`section[data-group-id="${groupId}"]`);
    if (groupSection) {
        groupSection.style.display = 'block';
    }
}