// js/components/search.js

import { menuData, utilityData } from '../data/menuData.js';
import { loadContent, updateSidebar, findContentById } from './contentLoader.js';

const searchInput = document.getElementById('searchInput');

export function handleSearch(event) {
    event.preventDefault();
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (!searchTerm) {
        alert('Please enter a search term.');
        return;
    }

    const allData = { ...menuData, ...utilityData };
    const searchResults = [];

    // Helper function to recursively search for content
    function findContent(items) {
        if (!items) return;
        for (const key in items) {
            const item = items[key];
            const searchableText = `${item.title || ''} ${item.content || ''}`.toLowerCase();
            
            if (searchableText.includes(searchTerm)) {
                if (!searchResults.some(res => res.id === item.id)) {
                    searchResults.push({
                        id: item.id || key,
                        title: item.title || 'Page',
                        content: item.content,
                        pageTitle: item.pageTitle,
                        metaDescription: item.metaDescription,
                        canonicalUrl: item.canonicalUrl,
                        menuKey: key // Store the menu key to help with sidebar updates
                    });
                }
            }
            // Recursively search in sub-items and groups
            if (item.subItems) {
                item.subItems.forEach(subItem => findContent({ [subItem.id]: subItem }));
            }
            if (item.groups) {
                item.groups.forEach(group => {
                    findContent({ [group.id]: group });
                });
            }
        }
    }
    
    findContent(allData);

    let searchResultsHtml = `<h3>Search Results for: "${searchTerm}"</h3>`;
    if (searchResults.length > 0) {
        searchResultsHtml += `<p>Found ${searchResults.length} results.</p><hr>`;
        searchResults.forEach(result => {
            const highlightedContent = result.content.replace(new RegExp(searchTerm, 'gi'), `<span class="highlight">${searchTerm}</span>`);
            searchResultsHtml += `<div class="search-result-item"><a href="#" data-search-id="${result.id}"><h5>${result.title}</h5></a><p>${highlightedContent}</p></div>`;
        });
    } else {
        searchResultsHtml += `<p>No results found for "${searchTerm}".</p>`;
    }

    // Hide sidebar
    document.getElementById('sidebar').classList.remove('show');
    
    // Clear top nav active state
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => link.classList.remove('active'));


    // Load search results into main content area
    loadContent({
        content: searchResultsHtml,
        pageTitle: `Search Results for "${searchTerm}" | Your Company`,
        metaDescription: `Search results for "${searchTerm}" on our website.`,
        canonicalUrl: `/search?q=${encodeURIComponent(searchTerm)}`
    });

    history.pushState({ search: searchTerm }, `Search Results for "${searchTerm}"`, `/search?q=${encodeURIComponent(searchTerm)}`);
}

// Listener for search result links
export function attachSearchResultListener() {
    document.getElementById('content-area').addEventListener('click', (e) => {
        const link = e.target.closest('a[data-search-id]');
        if (link) {
            e.preventDefault();
            const searchId = link.getAttribute('data-search-id');
            const foundContent = findContentById(searchId);
            
            if (foundContent) {
                const { page, menuKey, contentId } = foundContent;
                
                loadContent(page);
                
                // Update top navigation active state if it's a main menu item
                document.querySelectorAll('.navbar-nav .nav-link').forEach(navLink => {
                    navLink.classList.remove('active');
                    if (navLink.getAttribute('data-menu') === menuKey) {
                        navLink.classList.add('active');
                    }
                });

                // Update sidebar if it's a sub-menu item
                if (menuKey) {
                    updateSidebar(menuKey, contentId);
                } else {
                    document.getElementById('sidebar').classList.remove('show');
                }
                
                // Update URL for the new page
                const path = menuKey ? (contentId ? `#${menuKey}/${contentId}` : `#${menuKey}`) : `#${searchId}`;
                history.pushState({ menu: menuKey, contentId: contentId, utility: menuKey ? null : searchId }, page.pageTitle, path);
            }
        }
    });
}