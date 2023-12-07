const swaggerConfig = {
  swagger: '3.0',
  info: {
    title: 'Your API Documentation',
    version: '1.0',
  },
  openapi: '3.0.0',
  apis: ['**/*.controller.ts', '**/*.dto.ts'], // Include your DTO files
};

module.exports = swaggerConfig;
