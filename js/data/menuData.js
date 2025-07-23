// js/data/menuData.js

// Import individual data modules
import { homeData } from './homeData.js';
import { productsData } from './productsData.js';
import { servicesData } from './servicesData.js';
import { datascienceData } from './datascienceData.js';
import { aboutData } from './aboutData.js';
import { contactData } from './contactData.js';
import { legalData } from './legalData.js';
import { utilityData } from './utilityData.js';

// Consolidate all imported data into the main menuData object
export const menuData = {
    home: homeData,
    products: productsData,
    services: servicesData,
    datascience: datascienceData,
    about: aboutData,
    contact: contactData,
    legal: legalData,
    utility: utilityData
};