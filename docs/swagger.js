const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Expense Tracker API',
            version: '1.0.0',
            description: 'API for tracking users, incomes, and expenses',
        },
        servers: [
            {
                url: 'http://localhost:8080',
                description: 'Local Development Server',
            },
        ],
    },
    apis: ['./src/controllers/*.js', './src/routes/*.js'], // Files containing annotations as above
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
