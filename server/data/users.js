const bcrypt = require('bcryptjs');

const users = [
    {
        name: 'Owner User',
        email: 'owner@velmora.com',
        password: 'password123',
        role: 'owner'
    },
    {
        name: 'Customer User',
        email: 'customer@velmora.com',
        password: 'password123',
        role: 'customer',
        addresses: [{
            type: 'Home',
            address: '123 Luxury Lane',
            city: 'Paris',
            state: 'Ile-de-France',
            pincode: '75001'
        }]
    }
];

module.exports = users;
