// js/components/search.js
import { menuData } from '../data/menuData.js';
import { updateContentArea } from './contentLoader.js';
import { activateMenuItem } from './navigation.js'; // Also need to activate menu

const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const contentArea = document.getElementById('content-area'); // Re-declare or pass as param if truly global

export function setupSearch() {
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const query = searchInput.value.trim();

        if (!query) {
            contentArea.innerHTML = '<h3>Search</h3><p>Please enter a search term.</p>';
            // These would normally be handled by a central state management or passed as function params
            document.getElementById('sidebar').classList.remove('show');
            document.querySelectorAll('.navbar-nav .nav-link').forEach(navLink => navLink.classList.remove('active'));
            return;
        }

        let searchResultsHtml = `<h3>Search Results for "${query}"</h3>`;
        let foundResults = false;
        let resultsCount = 0;

        for (const menuKey in menuData) {
            const menu = menuData[menuKey];
            menu.subItems.forEach(item => {
                if (item.content.toLowerCase().includes(query.toLowerCase()) || item.text.toLowerCase().includes(query.toLowerCase())) {
                    foundResults = true;
                    resultsCount++;

                    let excerpt = '';
                    const contentLower = item.content.toLowerCase();
                    const queryLower = query.toLowerCase();
                    let startIndex = contentLower.indexOf(queryLower);

                    if (startIndex !== -1) {
                        const snippetLength = 150;
                        const start = Math.max(0, startIndex - (snippetLength / 2));
                        const end = Math.min(item.content.length, startIndex + query.length + (snippetLength / 2));
                        excerpt = item.content.substring(start, end);

                        if (start > 0) excerpt = '...' + excerpt;
                        if (end < item.content.length) excerpt = excerpt + '...';

                        const regex = new RegExp(`(${query})`, 'gi');
                        excerpt = excerpt.replace(regex, '<span class="highlight">$1</span>');
                    } else {
                        excerpt = item.text;
                    }

                    searchResultsHtml += `
                            <div class="search-result-item">
                                <h5>${item.text} <small class="text-muted">(${menu.title})</small></h5>
                                <p>${excerpt}</p>
                                <a href="#" class="btn btn-sm btn-outline-primary search-result-link"
                                   data-menu="${menuKey}" data-content="${item.id}" data-highlight="${query}">View Page</a>
                            </div>
                        `;
                }
            });
        }

        if (!foundResults) {
            searchResultsHtml += '<p>No results found for your search.</p>';
        } else {
            searchResultsHtml = `<h3>${resultsCount} Results for "${query}"</h3>` + searchResultsHtml;
        }

        contentArea.innerHTML = searchResultsHtml;
        document.getElementById('sidebar').classList.remove('show');
        document.querySelectorAll('.navbar-nav .nav-link').forEach(navLink => navLink.classList.remove('active'));
    });
}