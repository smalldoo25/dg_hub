



// JavaScript for dynamic menu and content loading


// Define sub-menu items and their corresponding content
const menuData = {
    home: {
        title: 'Consumer Analytics',
        subItems: [
            { id: 'home-intro', text: 'Introduction', content: '<h3>Welcome Home!</h3><p>This is the introductory content for the Home section.</p><p>Explore our features and get started.</p><img src="./images/centerpic.png" class="img-fluid rounded-corners mt-3" alt="main contents"><img src="https://placehold.co/500x250/d1e7dd/0f5132?text=Home+Intro" class="img-fluid rounded-corners mt-3" alt="Home Introduction">' },
            { id: 'home-features', text: 'Key Features', content: '<h3>Our Key Features</h3><p>Discover the powerful features that make our platform stand out.</p><ul><li>Feature 1: Seamless Integration</li><li>Feature 2: Robust Security</li><li>Feature 3: User-Friendly Interface</li></ul>' },
            { id: 'home-testimonials', text: 'Testimonials', content: '<h3>What Our Clients Say</h3><p>"Excellent service and support!" - John Doe</p><p>"Highly recommended!" - Jane Smith</p>' }
        ]
    },
    products: {
        title: 'Demand/Value Analytics',
        subItems: [
            { id: 'prod-software', text: 'Software Solutions', content: '<h3>Software Solutions</h3><p>We offer a range of software products tailored to your business needs.</p><p>From CRM to ERP, find the perfect fit.</p><img src="https://placehold.co/500x250/cfe2ff/084298?text=Software+Solutions" class="img-fluid rounded-corners mt-3" alt="Software Solutions">' },
            { id: 'prod-hardware', text: 'Hardware Devices', content: '<h3>Hardware Devices</h3><p>Explore our cutting-edge hardware devices designed for performance and reliability.</p><p>Servers, workstations, and peripherals.</p>' },
            { id: 'prod-accessories', text: 'Accessories', content: '<h3>Accessories</h3><p>Enhance your experience with our wide selection of accessories.</p>' }
        ]
    },
    services: {
        title: 'UX/UI Analytics',
        subItems: [
            { id: 'serv-consulting', text: 'Consulting', content: '<h3>Consulting Services</h3><p>Our expert consultants provide strategic advice to help your business grow.</p><p>Leverage our industry knowledge.</p><img src="https://placehold.co/500x250/d1e7dd/0f5132?text=Consulting+Services" class="img-fluid rounded-corners mt-3" alt="Consulting Services">' },
            { id: 'serv-support', text: 'Technical Support', content: '<h3>Technical Support</h3><p>Get round-the-clock technical support from our dedicated team.</p>' },
            { id: 'serv-training', text: 'Training Programs', content: '<h3>Training Programs</h3><p>Empower your team with our comprehensive training programs.</p>' }
        ]
    },
    datascience: {
        title: 'Data Science and AI',
        subItems: [
            { id: 'serv-consulting', text: 'Consulting', content: '<h3>Consulting Services</h3><p>Our expert consultants provide strategic advice to help your business grow.</p><p>Leverage our industry knowledge.</p><img src="https://placehold.co/500x250/d1e7dd/0f5132?text=Consulting+Services" class="img-fluid rounded-corners mt-3" alt="Consulting Services">' },
            { id: 'serv-support', text: 'Technical Support', content: '<h3>Technical Support</h3><p>Get round-the-clock technical support from our dedicated team.</p>' },
            { id: 'serv-training', text: 'Training Programs', content: '<h3>Training Programs</h3><p>Empower your team with our comprehensive training programs.</p>' }
        ]
    },
    about: {
        title: 'About Us',
        subItems: [
            { id: 'about-company', text: 'Our Company', content: '<h3>About Our Company</h3><p>We are a leading provider of innovative solutions, committed to excellence and customer satisfaction.</p><p>Learn about our mission and values.</p><img src="https://placehold.co/500x250/fff3cd/664d03?text=Our+Company" class="img-fluid rounded-corners mt-3" alt="Our Company">' },
            { id: 'about-team', text: 'Our Team', content: '<h3>Meet Our Team</h3><p>Our diverse team of professionals is passionate about delivering high-quality results.</p>' },
            { id: 'about-history', text: 'Our History', content: '<h3>Our History</h3><p>Discover our journey from humble beginnings to a market leader.</p>' }
        ]
    },
    contact: {
        title: 'Contact Us',
        subItems: [
            { id: 'contact-form', text: 'Send a Message', content: '<h3>Send Us a Message</h3><p>Fill out the form below to get in touch with us.</p><form><div class="mb-3"><label for="name" class="form-label">Name</label><input type="text" class="form-control rounded-corners" id="name"></div><div class="mb-3"><label for="email" class="form-label">Email</label><input type="email" class="form-control rounded-corners" id="email"></div><div class="mb-3"><label for="message" class="form-label">Message</label><textarea class="form-control rounded-corners" id="message" rows="3"></textarea></div><button type="submit" class="btn btn-primary rounded-corners">Submit</button></form>' },
            { id: 'contact-info', text: 'Contact Information', content: '<h3>Contact Information</h3><p>Email: info@yourcompany.com</p><p>Phone: +1 (123) 456-7890</p><p>Address: 123 Main St, Anytown, USA</p>' }
        ]
    },
    legal: {
        title: 'Legal Information',
        subItems: [
            { id: 'privacy-policy', text: 'Privacy Policy', content: '<h3>Privacy Policy</h3><p>This is our Privacy Policy. We are committed to protecting your privacy and personal data. This policy explains how we collect, use, and share information about you.</p><p>This is placeholder content for the Privacy Policy.</p><p>Last Updated: July 10, 2025</p>' },
            { id: 'terms-of-service', text: 'Terms of Service', content: '<h3>Terms of Service</h3><p>By using our services, you agree to these Terms of Service. Please read them carefully.</p><ul><li>Acceptance of Terms</li><li>User Conduct</li><li>Intellectual Property</li><li>Limitation of Liability</li><li>Governing Law</li></ul><p>This is placeholder content for the Terms of Service.</p>' },
            // Sitemap content will be generated dynamically
            { id: 'sitemap', text: 'Sitemap', content: '' } // Content will be generated by JS
        ]
    },
    utility: { // New category for utility links
        title: 'Utility Pages',
        subItems: [
            {
                id: 'login-page', text: 'Login', content: `
                        <h3>Login to Your Account</h3>
                        <form id="loginForm">
                            <div class="mb-3">
                                <label for="loginEmail" class="form-label">Email address</label>
                                <input type="email" class="form-control rounded-corners" id="loginEmail" aria-describedby="emailHelp" required>
                            </div>
                            <div class="mb-3">
                                <label for="loginPassword" class="form-label">Password</label>
                                <input type="password" class="form-control rounded-corners" id="loginPassword" required>
                            </div>
                            <button type="submit" class="btn btn-primary rounded-corners">Login</button>
                            <div id="loginMessage" class="message-box mt-3" style="display: none;"></div>
                        </form>
                        <p class="mt-3">Not registered yet? <button class="btn btn-link p-0 align-baseline" id="registerButton">Sign up here</button>.</p>
                    `},
            {
                id: 'registration-page', text: 'Register', content: `
                        <h3>Register for an Account</h3>
                        <form id="registrationForm">
                            <div class="mb-3">
                                <label for="regEmail" class="form-label">Email address</label>
                                <input type="email" class="form-control rounded-corners" id="regEmail" required>
                            </div>
                            <div class="mb-3">
                                <label for="regPassword" class="form-label">Password</label>
                                <input type="password" class="form-control rounded-corners" id="regPassword" required>
                            </div>
                            <button type="submit" class="btn btn-primary rounded-corners">Register</button>
                            <div id="registrationMessage" class="message-box mt-3" style="display: none;"></div>
                        </form>
                        <p class="mt-3">Already have an account? <button class="btn btn-link p-0 align-baseline" id="goToLoginButton">Login here</button>.</p>
                    `},
            { id: 'help-page', text: 'Help & Support', content: '<h3>Help & Support</h3><p>Welcome to our Help Center. Here you can find answers to frequently asked questions and contact our support team.</p><h4>Frequently Asked Questions:</h4><ul><li>How do I reset my password?</li><li>What payment methods do you accept?</li><li>How can I contact customer service?</li></ul><p>For further assistance, please use our <a href="#" class="utility-link" data-content-id="contact-form">Contact Form</a>.</p>' }
        ]
    }
};


const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const footerLinks = document.querySelectorAll('.footer-link');
const utilityLinks = document.querySelectorAll('.utility-link');
const sidebar = document.getElementById('sidebar');
const sidebarTitle = document.getElementById('sidebar-title');
const sidebarNav = sidebar.querySelector('.sidebar-nav');
const contentArea = document.getElementById('content-area');
const logoLink = document.getElementById('logo-link');
const searchForm = document.getElementById('searchForm'); // Get the search form
const searchInput = document.getElementById('searchInput'); // Get the search input

let activeTopMenu = null; // To keep track of the currently active top menu item

// Function to load sub-menu items into the sidebar
function loadSubMenu(menuKey) {
    sidebarNav.innerHTML = ''; // Clear existing sub-menu items
    const data = menuData[menuKey];
    if (data) {
        sidebarTitle.textContent = data.title;
        data.subItems.forEach(item => {
            // Sitemap is a special page, not a sub-menu of "Legal" that would appear in the sidebar
            if (menuKey === 'legal' && item.id === 'sitemap') {
                return;
            }
            // Registration page is a utility page, not meant for sidebar
            if (menuKey === 'utility' && item.id === 'registration-page') {
                return;
            }

            const link = document.createElement('a');
            link.classList.add('nav-link', 'rounded-corners');
            link.href = '#';
            link.setAttribute('data-content', item.id);
            link.textContent = item.text;
            sidebarNav.appendChild(link);

            // Add event listener for sub-menu item clicks
            link.addEventListener('click', function (event) {
                event.preventDefault();
                updateContentArea(item.id); // Only update content
                // Remove active class from all sub-menu links
                sidebarNav.querySelectorAll('.nav-link').forEach(subLink => {
                    subLink.classList.remove('active');
                });
                // Add active class to the clicked sub-menu link
                this.classList.add('active');
            });
        });
        sidebar.classList.add('show'); // Ensure sidebar is shown
    } else {
        sidebar.classList.remove('show'); // Hide sidebar if no data for the menuKey
    }
}

// Function to solely update the content area based on contentId
function updateContentArea(contentId, highlightTerm = null) {
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
        // If a highlight term is provided, apply highlighting
        if (highlightTerm) {
            const regex = new RegExp(`(${highlightTerm})`, 'gi'); // Case-insensitive global match
            contentToLoad = contentToLoad.replace(regex, '<span class="highlight">$1</span>');
        }
        contentArea.innerHTML = contentToLoad;
        // After content is loaded, attach event listeners for new elements
        attachDynamicEventListeners();
    } else {
        contentArea.innerHTML = '<h3>Content Not Found</h3><p>The requested content could not be loaded.</p>';
    }
}

// Central function to handle activating a top-level menu item
// This function will be called by top nav clicks, logo clicks, and sitemap clicks
function activateMenuItem(menuKey, contentIdToLoad = null, highlightTerm = null) {
    // Deactivate all top navigation links
    navLinks.forEach(navLink => navLink.classList.remove('active'));
    // Deactivate all sub-menu links
    sidebarNav.querySelectorAll('.nav-link').forEach(subLink => {
        subLink.classList.remove('active');
    });

    const targetTopLink = document.querySelector(`.navbar-nav .nav-link[data-menu="${menuKey}"]`);

    if (targetTopLink) {
        targetTopLink.classList.add('active'); // Activate the relevant top nav link
        activeTopMenu = menuKey; // Set active top menu
        loadSubMenu(menuKey); // Load the sub-menu for this top-level item

        setTimeout(() => { // Give DOM a moment to render sidebar links
            let contentFoundAndLoaded = false;
            if (contentIdToLoad) {
                // Try to find the specific content within the activated menu's subItems
                const subItemToLoad = menuData[menuKey]?.subItems.find(item => item.id === contentIdToLoad);
                if (subItemToLoad) {
                    updateContentArea(contentIdToLoad, highlightTerm); // Pass highlightTerm
                    // Set active class for the specific sub-menu item
                    const activeSubLink = sidebarNav.querySelector(`.nav-link[data-content="${contentIdToLoad}"]`);
                    if (activeSubLink) {
                        activeSubLink.classList.add('active');
                    }
                    contentFoundAndLoaded = true;
                }
            }

            // If no specific content was provided, or if it wasn't found in the current menu,
            // default to the first sub-item's content
            if (!contentFoundAndLoaded) {
                const firstSubMenuItem = sidebarNav.querySelector('.nav-link');
                if (firstSubMenuItem) {
                    updateContentArea(firstSubMenuItem.getAttribute('data-content'));
                    firstSubMenuItem.classList.add('active');
                } else {
                    // If a top-level menu has no sub-items, just show its title or a placeholder
                    updateContentArea('no-sub-items'); // Special ID for placeholder
                }
            }
        }, 100);
    } else {
        // If a top menu key is not found (e.g., for Login/Help/Privacy etc.)
        // These are treated as standalone pages without a dynamic sidebar
        sidebar.classList.remove('show');
        activeTopMenu = null; // No active top menu
        updateContentArea(contentIdToLoad || 'content-not-found', highlightTerm); // Load specific content or generic not found, pass highlightTerm
    }
}


// Function to dynamically generate sitemap content
function generateSitemapContent() {
    let sitemapHtml = '<h3>Sitemap</h3><div class="sitemap-list">';

    for (const menuKey in menuData) {
        // Skip utility links in main sitemap if desired, or include them
        if (menuKey === 'utility') continue; // Example: Don't list Login/Help in main sitemap

        const menu = menuData[menuKey];
        sitemapHtml += `<h4>${menu.title}</h4><ul>`;
        menu.subItems.forEach(item => {
            // Exclude sitemap itself from listing if it's in 'legal'
            if (menuKey === 'legal' && item.id === 'sitemap') {
                return; // Don't link to sitemap from within sitemap
            }
            // Exclude registration page from sitemap if it's in 'utility'
            if (menuKey === 'utility' && item.id === 'registration-page') {
                return;
            }
            // For sitemap links, include both data-menu and data-content
            sitemapHtml += `<li><a href="#" class="sitemap-link" data-menu="${menuKey}" data-content="${item.id}">${item.text}</a></li>`;
        });
        sitemapHtml += `</ul>`;
    }
    sitemapHtml += '</div>';
    return sitemapHtml;
}


// Event listeners for top navigation links
navLinks.forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        const menuKey = this.getAttribute('data-menu');
        activateMenuItem(menuKey); // Call the central activation function
    });
});

// Event listener for the Logo link
logoLink.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default link behavior
    activateMenuItem('home'); // Activate home menu
});

// Event listener for footer links (Privacy Policy, Terms of Service, Sitemap)
footerLinks.forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default link behavior
        const contentId = this.getAttribute('data-content-id');

        if (contentId === 'sitemap') {
            // For sitemap, we don't activate a top menu or sidebar initially
            // We just load its content and hide the sidebar.
            updateContentArea(contentId);
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            sidebar.classList.remove('show');
            activeTopMenu = null;
        } else {
            // For Privacy/Terms, load directly, no active top menu or sidebar
            updateContentArea(contentId);
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            sidebar.classList.remove('show');
            activeTopMenu = null;
        }
    });
});

// Event listener for Utility links (Login, Help)
utilityLinks.forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default link behavior
        const contentId = this.getAttribute('data-content-id');
        // Utility links activate standalone pages without specific menu/sidebar
        updateContentArea(contentId);
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        sidebar.classList.remove('show');
        activeTopMenu = null;
    });
});


// Event delegation for dynamically generated sitemap links and search result links
contentArea.addEventListener('click', function (event) {
    if (event.target.classList.contains('sitemap-link')) {
        event.preventDefault();
        const menuKey = event.target.getAttribute('data-menu');
        const contentId = event.target.getAttribute('data-content');
        activateMenuItem(menuKey, contentId); // Activate the relevant menu and load content
    } else if (event.target.classList.contains('search-result-link')) {
        event.preventDefault();
        const menuKey = event.target.getAttribute('data-menu');
        const contentId = event.target.getAttribute('data-content');
        const highlightTerm = event.target.getAttribute('data-highlight');
        activateMenuItem(menuKey, contentId, highlightTerm); // Activate menu, load content, and highlight
    } else if (event.target.id === 'registerButton') {
        event.preventDefault();
        updateContentArea('registration-page');
        // Hide any active top menu or sidebar when going to registration
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        sidebar.classList.remove('show');
        activeTopMenu = null;
    } else if (event.target.id === 'goToLoginButton') {
        event.preventDefault();
        updateContentArea('login-page');
        // Hide any active top menu or sidebar when going to login
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        sidebar.classList.remove('show');
        activeTopMenu = null;
    }
});


// Initial load: Simulate clicking the 'Home' link to show its sub-menu and content
document.addEventListener('DOMContentLoaded', () => {
    activateMenuItem('home');
});

// --- Search Functionality ---
searchForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting normally (reloading page)
    const query = searchInput.value.trim(); // Get search term (don't convert to lower case immediately)

    if (!query) {
        // If search term is empty, just return or show a message
        contentArea.innerHTML = '<h3>Search</h3><p>Please enter a search term.</p>';
        sidebar.classList.remove('show');
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        activeTopMenu = null;
        return;
    }

    let searchResultsHtml = `<h3>Search Results for "${query}"</h3>`;
    let foundResults = false;
    let resultsCount = 0;

    // Iterate through all menu data to find matches
    for (const menuKey in menuData) {
        const menu = menuData[menuKey];
        menu.subItems.forEach(item => {
            // Check if query is in content or text (case-insensitive search)
            if (item.content.toLowerCase().includes(query.toLowerCase()) || item.text.toLowerCase().includes(query.toLowerCase())) {
                foundResults = true;
                resultsCount++;

                let excerpt = '';
                const contentLower = item.content.toLowerCase();
                const queryLower = query.toLowerCase();
                let startIndex = contentLower.indexOf(queryLower);

                // If the query is found in the content, take a snippet around it
                if (startIndex !== -1) {
                    const snippetLength = 150; // Max length of the snippet
                    const start = Math.max(0, startIndex - (snippetLength / 2));
                    const end = Math.min(item.content.length, startIndex + query.length + (snippetLength / 2));
                    excerpt = item.content.substring(start, end);

                    // Add ellipses if snippet is truncated
                    if (start > 0) excerpt = '...' + excerpt;
                    if (end < item.content.length) excerpt = excerpt + '...';

                    // Highlight the term in the excerpt (case-insensitive)
                    const regex = new RegExp(`(${query})`, 'gi');
                    excerpt = excerpt.replace(regex, '<span class="highlight">$1</span>');
                } else {
                    // If only in text or no good content match, just use the original item text for excerpt
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

    contentArea.innerHTML = searchResultsHtml; // Display search results
    sidebar.classList.remove('show'); // Hide sidebar for search results
    navLinks.forEach(navLink => navLink.classList.remove('active')); // Deactivate top nav links
    activeTopMenu = null;
});

// --- User Registration and Login Logic ---

// Function to get users from local storage
function getUsers() {
    const usersJson = localStorage.getItem('registeredUsers');
    return usersJson ? JSON.parse(usersJson) : [];
}

// Function to save users to local storage
function saveUsers(users) {
    localStorage.setItem('registeredUsers', JSON.stringify(users));
}

// Function to display messages in the content area
function showMessage(elementId, message, type) {
    const messageBox = document.getElementById(elementId);
    if (messageBox) {
        messageBox.textContent = message;
        messageBox.className = `message-box ${type}`;
        messageBox.style.display = 'block';
    }
}

// Function to hide messages
function hideMessage(elementId) {
    const messageBox = document.getElementById(elementId);
    if (messageBox) {
        messageBox.style.display = 'none';
    }
}

// Attach event listeners for dynamically loaded forms
function attachDynamicEventListeners() {
    // Registration Form Submission
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function (event) {
            event.preventDefault();
            hideMessage('registrationMessage'); // Clear previous messages

            const regEmail = document.getElementById('regEmail').value;
            const regPassword = document.getElementById('regPassword').value;

            let users = getUsers();

            // Check if user already exists
            if (users.some(user => user.email === regEmail)) {
                showMessage('registrationMessage', 'Registration failed: User with this email already exists.', 'error');
                return;
            }

            // Add new user
            users.push({ email: regEmail, password: regPassword });
            saveUsers(users);

            showMessage('registrationMessage', 'Registration successful! Please log in.', 'success');
            registrationForm.reset(); // Clear the form
        });
    }

    // Login Form Submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            hideMessage('loginMessage'); // Clear previous messages

            const loginEmail = document.getElementById('loginEmail').value;
            const loginPassword = document.getElementById('loginPassword').value;

            const users = getUsers();
            const foundUser = users.find(user => user.email === loginEmail && user.password === loginPassword);

            if (foundUser) {
                showMessage('loginMessage', 'Login successful! Redirecting to home page...', 'success');
                loginForm.reset(); // Clear the form
                // Redirect to home page after a short delay
                setTimeout(() => {
                    activateMenuItem('home');
                }, 1500); // Wait 1.5 seconds before redirecting
            } else {
                showMessage('loginMessage', 'Login failed: Invalid email or password.', 'error');
            }
        });
    }
}

