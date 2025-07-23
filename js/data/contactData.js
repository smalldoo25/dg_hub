// js/data/contactData.js
export const contactData = {
    title: 'Contact Us',
    subItems: [
        { id: 'contact-form', text: 'Send a Message', content: '<h3>Send Us a Message</h3><p>Fill out the form below to get in touch with us.</p><form><div class="mb-3"><label for="name" class="form-label">Name</label><input type="text" class="form-control rounded-corners" id="name"></div><div class="mb-3"><label for="email" class="form-label">Email</label><input type="email" class="form-control rounded-corners" id="email"></div><div class="mb-3"><label for="message" class="form-label">Message</label><textarea class="form-control rounded-corners" id="message" rows="3"></textarea></div><button type="submit" class="btn btn-primary rounded-corners">Submit</button></form>' },
        { id: 'contact-info', text: 'Contact Information', content: '<h3>Contact Information</h3><p>Email: info@yourcompany.com</p><p>Phone: +1 (123) 456-7890</p><p>Address: 123 Main St, Anytown, USA</p>' }
    ]
};