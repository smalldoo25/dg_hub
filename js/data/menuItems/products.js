// products.js

export const products = {
    title: 'Product Categories',
    content: `
        <h3 id="prod-crm">Template</h3>
    `,
    pageTitle: 'Products | Your Company',
    metaDescription: 'Discover all our product categories, from software solutions to hardware devices and accessories.',
    canonicalUrl: '/products',
    groups: [
        {
            id: 'group-software-solutions',
            groupTitle: 'Software Solutions',
            subItems: [
                { id: 'prod-crm', text: 'CRM Software' }
               
            ]
        },
        {
            id: 'group-hardware-devices',
            groupTitle: 'Hardware Devices',
            subItems: [
                { id: 'prod-laptops', text: 'Laptops & Desktops' }
               
            ]
        },
        {
            id: 'group-accessories',
            groupTitle: 'Accessories',
            subItems: [
                { id: 'prod-peripherals', text: 'Peripherals' },
                { id: 'prod-cables', text: 'Cables & Adapters' }
            ]
        }
    ]
};