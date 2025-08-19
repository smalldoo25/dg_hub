// search.js

import { menuData } from '../data/menuData.js';
import { loadMainContent } from './dynamicContent.js';

export function performSearch(query) {
    const lowerCaseQuery = query.toLowerCase();
    let resultsHtml = `<h2>Search Results for "${query}"</h2>`;
    let foundResults = false;

    for (const menuKey in menuData) {
        const item = menuData[menuKey];
        let contentToSearch = item.title.toLowerCase();
        if (item.content) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = item.content;
            contentToSearch += ' ' + tempDiv.textContent.toLowerCase();
        }

        if (contentToSearch.includes(lowerCaseQuery)) {
            foundResults = true;
            resultsHtml += `
                <div class="search-result-item">
                    <h5><a href="#" class="search-link" data-content="${menuKey}">${item.title}</a></h5>
                    <p>${item.metaDescription || 'No description available.'}</p>
                </div>
            `;
        }
    }

    if (!foundResults) {
        resultsHtml += '<div class="alert alert-warning mt-4" role="alert">No results found. Please try a different search term.</div>';
    }

    // Display the results in the content area
    document.getElementById('content-area').innerHTML = resultsHtml;
    document.getElementById('sidebar').classList.remove('show');
    document.querySelectorAll('.navbar-nav .nav-link').forEach(nav => nav.classList.remove('active'));

    // Rebind the click listeners for the new search links
    document.querySelectorAll('.search-link').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const contentId = this.getAttribute('data-content');
            loadMainContent(contentId);
        });
    });
}