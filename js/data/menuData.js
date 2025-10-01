// menuData.js

import { home } from './menuItems/home.js';
import { contact } from './menuItems/contact.js';
import { privacyPolicy } from './menuItems/privacyPolicy.js';
import { termsOfService } from './menuItems/termsOfService.js';
import { sitemap } from './menuItems/sitemap.js';
// import { loginPage } from './menuItems/loginPage.js';
import { helpPage } from './menuItems/helpPage.js';
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
    'privacy-policy': privacyPolicy,
    'terms-of-service': termsOfService,
    sitemap: sitemap,
    // 'login-page': loginPage,
    'help-page': helpPage
};

