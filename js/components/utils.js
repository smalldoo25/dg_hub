// components/utils.js


export function findContent(id, menuData) {
    if (menuData[id]) {
        // This is a main menu item
        return { id: id, ...menuData[id], parentKey: id, isMain: true };
    }
    for (const menuKey in menuData) {
        const menu = menuData[menuKey];
        if (menu.groups) {
            for (const group of menu.groups) {
                if (group.id === id) {
                    // This is a group
                    return { ...group, parentKey: menuKey, isGroup: true };
                }
                const item = group.subItems.find(sub => sub.id === id);
                if (item) {
                    // This is a sub-item
                    return { ...item, parentKey: menuKey, groupParent: group.id };
                }
            }
        }
        if (menu.subItems) {
            const item = menu.subItems.find(sub => sub.id === id);
            if (item) {
                 // This is a stand-alone sub-item
                return { ...item, parentKey: menuKey };
            }
        }
    }
    return null;
}


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


export function addNavigationLinks(parentMenuKey, groupId, currentId, menuData, findContent) {
    // Check if the current content is an introduction or conclusion
    const isSpecialId = currentId === 'introduction' || currentId === 'conclusion';

    // Find the correct container for the navigation buttons
    let navContainer = null;
    if (groupId) {
        navContainer = document.querySelector(`section[data-group-id="${groupId}"]`);
    } else {
        navContainer = document.querySelector(`section[data-${currentId}-id="${currentId}"]`)?.closest('.content-area');
    }

    if (!navContainer) return;

    const oldNav = navContainer.querySelector('.navigation-buttons');
    if (oldNav) oldNav.remove();

    const navDiv = document.createElement('div');
    navDiv.classList.add('navigation-buttons', 'd-flex', 'justify-content-between', 'mt-4');

    const parentMenu = menuData[parentMenuKey];
    const groups = parentMenu.groups;
    const groupIndex = groups ? groups.findIndex(g => g.id === groupId) : -1;
    const subItems = (groups && groups[groupIndex]) ? groups[groupIndex].subItems : [];
    const subItemIndex = subItems.findIndex(s => s.id === currentId);

    // Previous Button
    if (isSpecialId && currentId === 'conclusion') {
        const prevLink = document.createElement('a');
        prevLink.href = `#`;
        prevLink.classList.add('btn', 'btn-outline-secondary');
        prevLink.setAttribute('data-content', subItems[subItems.length - 1].id);
        prevLink.textContent = `← Previous`;
        navDiv.appendChild(prevLink);
    } else if (subItemIndex > 0) {
        const prevSubItem = subItems[subItemIndex - 1];
        const prevLink = document.createElement('a');
        prevLink.href = `#`;
        prevLink.classList.add('btn', 'btn-outline-secondary');
        prevLink.setAttribute('data-content', prevSubItem.id);
        prevLink.textContent = `← Previous`;
        navDiv.appendChild(prevLink);
    } else {
        navDiv.innerHTML += `<span></span>`;
    }

    // Next Button
    let nextId = null;
    let nextText = '';
    if (isSpecialId && currentId === 'introduction') {
        nextId = subItems.length > 0 ? subItems[0].id : (groups[0].id || null);
        nextText = 'Continue →';
    } else if (subItemIndex < subItems.length - 1) {
        nextId = subItems[subItemIndex + 1].id;
        nextText = `Continue →`;
    } else if (groupIndex < groups.length - 1) {
        nextId = groups[groupIndex + 1].id;
        nextText = `Continue to Next Group →`;
    } else if (parentMenu.content && parentMenu.content.includes('data-conclusion-id')) {
        nextId = 'conclusion';
        nextText = 'Continue to Conclusion →';
    }

    if (nextId) {
        const nextLink = document.createElement('a');
        nextLink.href = `#`;
        nextLink.classList.add('btn', 'btn-primary', 'ms-auto');
        nextLink.setAttribute('data-content', nextId);
        nextLink.textContent = nextText;
        navDiv.appendChild(nextLink);
    }

    if (navDiv.children.length > 0) {
        navContainer.appendChild(navDiv);
    }
}

export function populateDropdownMenu(menuKey, menuData) {
    const dropdownMenu = document.getElementById(`${menuKey}-dropdown-menu`);
    if (!dropdownMenu) return;

    dropdownMenu.innerHTML = '';
    const data = menuData[menuKey];
    if (!data || !data.groups) return;

    data.groups.forEach(group => {
        const groupHeader = document.createElement('li');
        const groupHeaderLink = document.createElement('a');
        groupHeaderLink.classList.add('dropdown-header');
        groupHeaderLink.setAttribute('data-content', group.id);
        groupHeaderLink.textContent = group.groupTitle;
        groupHeader.appendChild(groupHeaderLink);
        dropdownMenu.appendChild(groupHeader);

        group.subItems.forEach(item => {
            const dropdownItem = document.createElement('a');
            dropdownItem.classList.add('dropdown-item');
            dropdownItem.href = `#${item.id}`;
            dropdownItem.textContent = item.text;
            dropdownItem.setAttribute('data-content', item.id);
            dropdownMenu.appendChild(dropdownItem);
        });
    });
}