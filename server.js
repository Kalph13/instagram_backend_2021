/* Babel (Enables ES6 Syntax) is Required to Use 'import' */
/* Babel Install: npm install @babel/node @babel/preset-env @babel/core -D */
/* Babel Setting: Create babel.config.json ("preset") and Modify the Run Script (node server.js → babel-node server) */

/* dotenv: https://www.npmjs.com/package/dotenv */
/* Enables .env in Node.js */
require('dotenv').config();

/* GraphQL Upload in Apollo v3: https://www.apollographql.com/docs/apollo-server/data/file-uploads */
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";

/* Morgan Logger: https://www.npmjs.com/package/morgan */
import morgan from 'morgan';

import { typeDefs, resolvers } from './schema';
import { getUser } from './users/users.utils';

/* To Set 'PORT', Enter '$env:PORT=4000' in the PowerShell Before Running or Add 'PORT=4000' in '.env' */
/* Ref: https://stackoverflow.com/questions/52666152/process-env-port-is-undefined-in-linuxcloud-environment */
const PORT = process.env.PORT;

/* GraphQL Upload in Apollo v3: https://www.apollographql.com/docs/apollo-server/data/file-uploads */
const startServer = async () => {
    const server = new ApolloServer({
        resolvers,
        typeDefs,
        context: async ({ req }) => {
            /* Authentication (Server): https://www.apollographql.com/docs/apollo-server/security/authentication */
            /* Authentication (Client): https://www.apollographql.com/docs/react/networking/authentication/ */
            /* How to Set 'req.headers.authorization': Apollo Studio > Explorer > Shared Setting > Connection Setting > Shared headers > Authorization */
            return {
                loggedInUser: await getUser(req.headers.authorization)
            };
        },
        /* Must be Included for Security When Using GraphQL Upload */
        /* Doc: https://www.apollographql.com/blog/backend/file-uploads/file-upload-best-practices */
        csrfPrevention: true
    });

    await server.start();

    const app = express();
    app.use(graphqlUploadExpress());
    /* app.use(morgan("tiny")); */
    app.use("/static", express.static("uploads"));
    server.applyMiddleware({ app });

    await new Promise(r => app.listen({ port: PORT }, r));
    console.log(`Server is Ready at http://localhost:${PORT}${server.graphqlPath}`);
}

startServer();

/* server.listen(PORT).then(() => {
    console.log(`Server is Ready at http://localhost:${PORT}`);
}); */