import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CleanCRUD API',
      version: '1.0.0',
      description: 'A clean, simple and scalable RESTful API built with **Express**, **Prisma**, **MongoDB**, and **Zod**, providing a solid boilerplate for authentication and product CRUD operations.',
    },
    servers: [
      {
        url: 'http://localhost:3000/v1',
        description: 'Local development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['src/routes/*.ts', 'src/controller/**/*.ts'], // adjust as per your folder structure
});
