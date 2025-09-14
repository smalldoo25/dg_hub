// components/search.js

import { menuData } from '../data/menuData.js'; // Ensure menuData is imported
import { findContent } from './utils.js';

export function searchContent(query, contentArea) {
    const lowerCaseQuery = query.toLowerCase();
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = contentArea.innerHTML;

    // Reset previous highlights and restore original text
    const oldHighlights = tempDiv.querySelectorAll('.highlight');
    oldHighlights.forEach(el => {
        const parent = el.parentNode;
        while (el.firstChild) {
            parent.insertBefore(el.firstChild, el);
        }
        parent.removeChild(el);
    });

    const walker = document.createTreeWalker(tempDiv, NodeFilter.SHOW_TEXT, null, false);
    let node;
    let found = false;

    // Iterate through all text nodes to find matches
    while ((node = walker.nextNode()) !== null) {
        if (node.parentNode.tagName === 'SCRIPT' || node.parentNode.tagName === 'STYLE') {
            continue; // Skip script and style tags
        }
        const text = node.nodeValue;
        const lowerText = text.toLowerCase();
        let index = lowerText.indexOf(lowerCaseQuery);

        if (index > -1 && !node.parentNode.classList.contains('highlight')) {
            found = true;
            let currentNode = node;
            const parent = currentNode.parentNode;
            let lastIndex = 0;

            while ((index = lowerText.indexOf(lowerCaseQuery, lastIndex)) !== -1) {
                const beforeText = text.substring(lastIndex, index);
                const matchText = text.substring(index, index + query.length);
                const afterText = text.substring(index + query.length);

                const beforeNode = document.createTextNode(beforeText);
                const highlightSpan = document.createElement('span');
                highlightSpan.className = 'highlight';
                highlightSpan.textContent = matchText;

                parent.insertBefore(beforeNode, currentNode);
                parent.insertBefore(highlightSpan, currentNode);

                // Update the current node to the one after the highlight for the next iteration
                currentNode.nodeValue = afterText;
                lastIndex = 0;
                lowerText = afterText.toLowerCase();

                // To prevent infinite loop if the search query is empty
                if (query.length === 0) break;
            }

            // After the loop, the original node should have the remaining text
            // or be empty, so no need to explicitly remove it
        }
    }

    if (!found) {
        alert('No results found on the current page.');
    } else {
        // Replace the main content with the new, highlighted content
        contentArea.innerHTML = tempDiv.innerHTML;
    }
}



// This function will be called from main.js to handle the search logic.
// It will now return a list of found content items.
export function performSearch(query, menuData, contentArea, searchInput) {
    const resultsContainer = document.createElement('div');

    // Get the sidebar element
    const sidebar = document.getElementById('sidebar');

    const lowerCaseQuery = query.toLowerCase();
    let foundResults = [];

    // Clear previous results and highlight
    contentArea.innerHTML = '';
    searchInput.value = '';

    // Hide the sidebar by removing its 'show' class
    sidebar.classList.remove('show');

    // Iterate through all menu items to find matches
    for (const menuKey in menuData) {
        const item = menuData[menuKey];
        if (item.pageTitle && item.pageTitle.toLowerCase().includes(query.toLowerCase())) {
            foundResults.push({ id: menuKey, type: 'main' });
        }
        if (item.content && item.content.toLowerCase().includes(query.toLowerCase())) {
            foundResults.push({ id: menuKey, type: 'content' });
        }
        if (item.subItems) {
            item.subItems.forEach(subItem => {
                // Defensive check: ensure 'text' and 'content' properties exist
                const subText = subItem.text ? subItem.text.toLowerCase() : '';
                const subContent = subItem.content ? subItem.content.toLowerCase() : '';
                
                if (subText.includes(query.toLowerCase()) || subContent.includes(query.toLowerCase())) {
                    foundResults.push({ id: subItem.id, type: 'sub' });
                }
            });
        }
        if (item.groups) {
            item.groups.forEach(group => {
                if (group.groupTitle && group.groupTitle.toLowerCase().includes(query.toLowerCase())) {
                    foundResults.push({ id: group.id, type: 'group' });
                }
                group.subItems.forEach(subItem => {
                    // Defensive check: ensure 'text' and 'content' properties exist
                    const subText = subItem.text ? subItem.text.toLowerCase() : '';
                    const subContent = subItem.content ? subItem.content.toLowerCase() : '';
                    
                    if (subText.includes(query.toLowerCase()) || subContent.includes(query.toLowerCase())) {
                        foundResults.push({ id: subItem.id, type: 'sub' });
                    }
                });
            });
        }
    }

    if (foundResults.length > 0) {
        const uniqueResults = [...new Set(foundResults.map(r => r.id))];

        const resultsContainer = document.createElement('div');
        resultsContainer.classList.add('search-results-container');
        resultsContainer.innerHTML = '<h4>Search Results</h4><hr>';

        uniqueResults.forEach(resultId => {
            const resultItem = findContent(resultId, menuData);
            if (resultItem) {
                const link = document.createElement('a');
                link.href = '#';
                link.classList.add('d-block', 'my-2', 'search-result-item');
                link.setAttribute('data-content', resultItem.id);

                const title = getHighlightedText(resultItem.text || resultItem.title || resultItem.groupTitle || 'Untitled', query);
                const description = getHighlightedText(resultItem.metaDescription || 'No description available.', query);
                
                link.innerHTML = `<h5>${title}</h5><p>${description}</p>`;
                resultsContainer.appendChild(link);
            }
        });
        contentArea.appendChild(resultsContainer);
    } else {
        contentArea.innerHTML = `<div class="alert alert-info" role="alert">No results found for "${query}".</div>`;
    }
}

function getHighlightedText(text, query) {
    if (!text || !query) {
        return text;
    }
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const parts = text.split(new RegExp(`(${lowerQuery})`, 'gi'));
    return parts.map(part => {
        if (part.toLowerCase() === lowerQuery) {
            return `<span class="highlight">${part}</span>`;
        }
        return part;
    }).join('');
}
