import express from 'express';
import swaggerUi from 'swagger-ui-express';
import {createRequire} from "module";
const route = express.Router();

const req = createRequire(import.meta.url);
const swaggerDocument = req('../swagger.json');
console.log(JSON.stringify(swaggerDocument));

// console.log("swagger");

route.use('/api-docs', swaggerUi.serve);
route.get('/api-docs', swaggerUi.setup(swaggerDocument));

// console.log(swaggerUI.setup(swaggerDocument));

export default route;