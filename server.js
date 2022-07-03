/* Babel (Enables ES6 Syntax) is Required to Use 'import' */
/* Babel Install: npm install @babel/node @babel/preset-env @babel/core -D */
/* Babel Setting: Create babel.config.json ("preset") and Modify the Run Script (node server.js → babel-node server) */

/* dotenv: https://www.npmjs.com/package/dotenv */
/* Enables .env in Node.js */
require('dotenv').config();

/* GraphQL Upload in Apollo v3: https://www.apollographql.com/docs/apollo-server/data/file-uploads */
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { makeExecutableSchema } from '@graphql-tools/schema';

/* Morgan Logger: https://www.npmjs.com/package/morgan */
import morgan from 'morgan';

import { typeDefs, resolvers } from './schema';
import { getUser } from './users/users.utils';

/* To Set 'PORT', Enter '$env:PORT=4000' in the PowerShell Before Running or Add 'PORT=4000' in '.env' */
/* Ref: https://stackoverflow.com/questions/52666152/process-env-port-is-undefined-in-linuxcloud-environment */
const PORT = process.env.PORT;
const schema = makeExecutableSchema({ typeDefs, resolvers });

/* GraphQL Upload in Apollo v3: https://www.apollographql.com/docs/apollo-server/data/file-uploads */
/* Enabling Subscription: https://www.apollographql.com/docs/apollo-server/data/subscriptions/#enabling-subscriptions */
/* Apollo Studio Setting For Subscription: https://www.apollographql.com/docs/studio/explorer/additional-features/#subscription-support */
const startServer = async () => {
    const app = express();
    const httpServer = createServer(app);
    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/graphql'
    });

    /* Context Setting For Subscription: https://www.apollographql.com/docs/apollo-server/data/subscriptions/#operation-context */
    const serverCleanup = useServer(
        {
            schema,
            /* Context to Subscription, Not GraphQL Resolvers */
            context: async (ctx, msg, args) => {
                console.log("ctx", ctx);
                console.log("msg", msg);
                console.log("args", args);
                if (ctx.connectionParams.Authorization) {
                    return {
                        loggedInUser: await getUser(ctx.connectionParams.Authorization)
                    };
                }

                return {
                    loggedInUser: null
                }
            }, 
            /* onConnect and onDisconnect: Configure Subscription Server's Behavior When a Client Connects or Disconnects */
            /* - Doc: https://www.apollographql.com/docs/apollo-server/data/subscriptions/#onconnect-and-ondisconnect */
            onConnect: async (ctx) => {
                console.log("Login Token: ", ctx.connectionParams.Authorization);
                
                if (!ctx.connectionParams.Authorization) {
                    throw new Error("You Can't Connect");                 
                }

                console.log("Subscription Connected");

                return {
                    loggedInUser: await getUser(ctx.connectionParams.Authorization)
                };
            },
            onDisconnect: async (ctx) => {
                console.log("Subscription Disconnected");
            }
        },
        wsServer
    );

    const apollo = new ApolloServer({
        resolvers,
        typeDefs,
        /* Context to GraphQL Resolvers */
        context: async ({ req }) => {
            /* Authentication (Server): https://www.apollographql.com/docs/apollo-server/security/authentication */
            /* Authentication (Client): https://www.apollographql.com/docs/react/networking/authentication/ */
            /* How to Set 'req.headers.authorization': Apollo Studio > Explorer > Shared Setting > Connection Setting > Shared headers > Authorization */
            if (req) {
                return {
                    loggedInUser: await getUser(req.headers.authorization)
                };
            }
        },
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        }
                    }
                }
            }
        ],
        cache: 'bounded',
        /* Must be Included for Security When Using GraphQL Upload */
        /* Doc: https://www.apollographql.com/blog/backend/file-uploads/file-upload-best-practices */
        csrfPrevention: true
    });

    await apollo.start();

    app.use(graphqlUploadExpress());
    /* app.use(morgan("combined")); */
    app.use("/static", express.static("uploads"));
    apollo.applyMiddleware({ app });

    await new Promise(r => httpServer.listen({ port: PORT }, r));
    console.log(`Server is Ready at http://localhost:${PORT}${apollo.graphqlPath}`);
}

startServer();

/* server.listen(PORT).then(() => {
    console.log(`Server is Ready at http://localhost:${PORT}`);
}); */
