// js/components/contentLoader.js

import { menuData, utilityData } from '../data/menuData.js';

const sidebar = document.getElementById('sidebar');
const sidebarTitle = document.getElementById('sidebar-title');
const sidebarNav = document.querySelector('.sidebar-nav');
const contentArea = document.getElementById('content-area');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const utilityLinks = document.querySelectorAll('.utility-link, .footer-link');
const logoLink = document.getElementById('logo-link');

// Helper function to find a page/content object by its ID or key
export function findContentById(id) {
    const allData = { ...menuData, ...utilityData };

    for (const key in allData) {
        const item = allData[key];
        if (key === id) {
            return { page: item, menuKey: id, contentId: null };
        }
        if (item.subItems) {
            const subItem = item.subItems.find(sub => sub.id === id);
            if (subItem) {
                return { page: subItem, menuKey: key, contentId: id };
            }
        }
        if (item.groups) {
            for (const group of item.groups) {
                if (group.id === id) {
                    return { page: group, menuKey: key, contentId: id };
                }
                const subItem = group.subItems.find(sub => sub.id === id);
                if (subItem) {
                    return { page: subItem, menuKey: key, contentId: id };
                }
            }
        }
    }
    return null;
}

// Function to update page metadata for SEO
function updatePageMetadata(page) {
    document.title = page.pageTitle;
    document.querySelector('meta[name="description"]').setAttribute('content', page.metaDescription);
    document.querySelector('link[rel="canonical"]').setAttribute('href', `https://deftagile.com${page.canonicalUrl}`);
}

// Function to generate the sitemap content dynamically
function generateSitemapContent() {
    let sitemapHtml = `<h3>Sitemap</h3>
        <p>A list of all the main pages and sub-pages on our website to help you navigate.</p>
        <ul class="sitemap-list">`;

    for (const key in menuData) {
        const item = menuData[key];
        sitemapHtml += `<li><a href="#" data-menu="${key}">${item.title}</a>`;
        if (item.groups || item.subItems) {
            sitemapHtml += `<ul>`;
            if (item.groups) {
                item.groups.forEach(group => {
                    sitemapHtml += `<li><a href="#" data-content-id="${group.id}">${group.groupTitle}</a>`;
                    sitemapHtml += `<ul>`;
                    group.subItems.forEach(subItem => {
                        sitemapHtml += `<li><a href="#" data-content-id="${subItem.id}">${subItem.text}</a></li>`;
                    });
                    sitemapHtml += `</ul></li>`;
                });
            } else if (item.subItems) {
                item.subItems.forEach(subItem => {
                    sitemapHtml += `<li><a href="#" data-content-id="${subItem.id}">${subItem.text}</a></li>`;
                });
            }
            sitemapHtml += `</ul>`;
        }
        sitemapHtml += `</li>`;
    }

    sitemapHtml += `<li><strong>Utility Pages</strong>
        <ul>`;
    for (const key in utilityData) {
        if (key !== 'sitemap') {
            const item = utilityData[key];
            sitemapHtml += `<li><a href="#" data-content="${key}">${item.title}</a></li>`;
        }
    }
    sitemapHtml += `</ul></li></ul>`;
    return sitemapHtml;
}


// Function to display content in the main area
export function loadContent(page) {
    if (!page) {
        console.error('Page content is missing.');
        return;
    }

    if (page.title === 'Sitemap') {
        contentArea.innerHTML = generateSitemapContent();
    } else {
        contentArea.innerHTML = page.content;
    }

    contentArea.scrollTop = 0;

    updatePageMetadata(page);
}

// Function to update the sidebar with sub-menu items
export function updateSidebar(currentMenu, activeId = null) {
    const data = menuData[currentMenu];

    if (data && (data.subItems?.length > 0 || data.groups?.length > 0)) {
        sidebar.classList.add('show');
        sidebarTitle.textContent = data.title;
        sidebarTitle.setAttribute('data-content', currentMenu);
        sidebarNav.innerHTML = ''; // Clear previous content

        let sidebarHtml = '';
        if (data.groups) {
            data.groups.forEach(group => {
                sidebarHtml += `<a href="#" class="nav-link group-title-link ${group.id === activeId ? 'active' : ''}" data-content-id="${group.id}">${group.groupTitle}</a>`;
                group.subItems.forEach(item => {
                    sidebarHtml += `<a href="#" class="nav-link ${item.id === activeId ? 'active' : ''}" data-content-id="${item.id}">${item.text}</a>`;
                });
            });
        } else if (data.subItems) {
            data.subItems.forEach(item => {
                sidebarHtml += `<a href="#" class="nav-link ${item.id === activeId ? 'active' : ''}" data-content-id="${item.id}">${item.text}</a>`;
            });
        }
        sidebarNav.innerHTML = sidebarHtml;
    } else {
        sidebar.classList.remove('show');
    }
}

// Function to handle clicks on the top navigation bar
export function handleMenuClick(event) {
    event.preventDefault();
    const currentMenu = event.target.getAttribute('data-menu');

    navLinks.forEach(link => link.classList.remove('active'));
    event.target.classList.add('active');

    if (currentMenu) {
        const page = menuData[currentMenu];
        loadContent(page);
        updateSidebar(currentMenu);
        history.pushState({ menu: currentMenu, contentId: null }, page.pageTitle, `#${currentMenu}`);
    }
}

// Function to handle clicks on sub-menu items in the sidebar
export function handleSubMenuClick(event) {
    event.preventDefault();
    const contentId = event.target.getAttribute('data-content-id');
    const currentMenu = sidebarTitle.getAttribute('data-content');

    const data = menuData[currentMenu];
    let page = null;

    if (data.groups) {
        data.groups.forEach(group => {
            if (group.id === contentId) {
                page = group;
            } else {
                const subItem = group.subItems.find(item => item.id === contentId);
                if (subItem) {
                    page = subItem;
                }
            }
        });
    } else if (data.subItems) {
        page = data.subItems.find(item => item.id === contentId);
    }
    
    document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => link.classList.remove('active'));
    event.target.classList.add('active');

    if (page) {
        loadContent(page);
        history.pushState({ menu: currentMenu, contentId: contentId }, page.pageTitle, `#${currentMenu}/${contentId}`);
    }
}

// Function to handle clicks on the sidebar title
export function handleSidebarTitleClick(event) {
    event.preventDefault();
    const currentMenu = event.target.getAttribute('data-content');
    if (currentMenu) {
        const page = menuData[currentMenu];
        loadContent(page);
        document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => link.classList.remove('active'));
        history.pushState({ menu: currentMenu, contentId: null }, page.pageTitle, `#${currentMenu}`);
    }
}

// Function to handle clicks on utility/footer links
export function handleUtilityLinkClick(event) {
    event.preventDefault();
    const contentKey = event.target.getAttribute('data-content');
    
    if (contentKey && utilityData[contentKey]) {
        navLinks.forEach(link => link.classList.remove('active'));
        sidebar.classList.remove('show');
        
        const page = utilityData[contentKey];
        loadContent(page);
        history.pushState({ utility: contentKey }, page.pageTitle, `#${contentKey}`);
    }
}

// // Function to handle the logo click event
// export function handleLogoClick(event) {
//     event.preventDefault();
//     const initialPage = menuData.home;
//     loadContent(initialPage);
//     updateSidebar('home');

//     // Update active class for top navigation
//     navLinks.forEach(link => {
//         link.classList.remove('active');
//         if (link.getAttribute('data-menu') === 'home') {
//             link.classList.add('active');
//         }
//     });

//     history.pushState({ menu: 'home', contentId: null }, initialPage.pageTitle, `#home`);
// }

// Function to handle the logo click event
export function handleLogoClick(event) {
    event.preventDefault();
    const initialPage = menuData.logo;
    loadContent(initialPage);
    updateSidebar('logo');

    // Update active class for top navigation
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-menu') === 'logo') {
            link.classList.add('active');
        }
    });

    history.pushState({ menu: 'logo', contentId: null }, initialPage.pageTitle, `#logo`);
}

// Handle clicks on dynamically generated sitemap links
export function handleSitemapClick(event) {
    event.preventDefault();
    const link = event.target.closest('a');
    if (!link) return;

    const dataMenu = link.getAttribute('data-menu');
    const dataContentId = link.getAttribute('data-content-id');
    const dataContent = link.getAttribute('data-content');

    if (dataMenu) {
        // Find the corresponding top nav link and simulate a click
        const navLink = document.querySelector(`.navbar-nav .nav-link[data-menu="${dataMenu}"]`);
        if (navLink) {
            navLink.click();
        }
    } else if (dataContentId) {
        // Handle sub-menu and group links
        const foundContent = findContentById(dataContentId);
        if (foundContent) {
            const { page, menuKey, contentId } = foundContent;
            
            document.querySelectorAll('.navbar-nav .nav-link').forEach(navLink => {
                navLink.classList.remove('active');
                if (navLink.getAttribute('data-menu') === menuKey) {
                    navLink.classList.add('active');
                }
            });

            loadContent(page);
            updateSidebar(menuKey, contentId);
            history.pushState({ menu: menuKey, contentId: contentId }, page.pageTitle, `#${menuKey}/${contentId}`);
        }
    } else if (dataContent) {
        // Handle utility links by calling the correct handler directly
        handleUtilityLinkClick(event);
    }
}