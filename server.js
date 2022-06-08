/* dotenv: https://www.npmjs.com/package/dotenv */
/* Enables .env in Node.js */
require('dotenv').config();

/* Babel (Enables ES6 Syntax) is Required to Use 'import' */
/* Babel Install: npm install @babel/node @babel/preset-env @babel/core -D */
/* Babel Setting: Create babel.config.json ("preset") and Modify the Run Script (node server.js → babel-node server) */
import { ApolloServer } from 'apollo-server';
import schema from './schema';

/* To Set 'PORT', Enter '$env:PORT=4000 (In the PowerShell)' Before Running */
/* Ref: https://stackoverflow.com/questions/52666152/process-env-port-is-undefined-in-linuxcloud-environment */
const PORT = process.env.PORT;

const server = new ApolloServer({ schema });

server.listen(PORT).then(() => {
    console.log(`Server is Ready at http://localhost:${PORT}`);
});