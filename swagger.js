import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'My API',
    description: 'Dwitter API'
  },
  host: 'localhost:8080',
  schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./router/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);