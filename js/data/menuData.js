// menuData.js

import { home } from './menuItems/home.js';
import { contact } from './menuItems/contact.js';
import { privacy } from './menuItems/privacy.js';
import { terms } from './menuItems/terms.js';
import { sitemap } from './menuItems/sitemap.js';
// import { loginPage } from './menuItems/loginPage.js';
import { help } from './menuItems/help.js';
import { downloads } from './menuItems/downloads.js';
import { about } from './menuItems/about.js';
import { deftagileguide } from './menuItems/deftagileGuide.js';
import { productsAnalyticsAI } from './menuItems/productsAnalyticsAI.js';
// import { products } from './menuItems/products.js';
import { uiUxAnalyticsMetrics } from './menuItems/uiUxAnalyticsMetrics.js';
import { hypothesisDriven } from './menuItems/hypothesisDriven.js';

export const menuData = {
    home: home,
    downloads: downloads,
    contact: contact,
    about: about,
    deftagileguide: deftagileguide,
    // products: products,
    productsAnalyticsAI: productsAnalyticsAI,
    uiUxAnalyticsMetrics: uiUxAnalyticsMetrics,
    hypothesisDriven: hypothesisDriven,
    'privacy': privacy,
    'terms': terms,
    sitemap: sitemap,
    // 'login-page': loginPage,
    'help': help
};

