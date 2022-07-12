/* Babel (Enables ES6 Syntax) is Required to Use 'import' */
/* Babel Install: npm install @babel/node @babel/preset-env @babel/core -D */
/* Babel Setting: Create babel.config.json ("preset") and Modify the Run Script (node server.js → babel-node server) */

/* dotenv: https://www.npmjs.com/package/dotenv */
/* Enables .env in Node.js */
require('dotenv').config();

/* GraphQL Upload in Apollo v3: https://www.apollographql.com/docs/apollo-server/data/file-uploads */
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { graphqlUploadExpress } from "graphql-upload";

/* Replaced by graphql-ws */
/* Subscription w/subscriptions-transport-ws: https://www.apollographql.com/docs/apollo-server/data/subscriptions/#switching-from-subscriptions-transport-ws */
/* import { SubscriptionServer } from 'subscriptions-transport-ws'; */

/* Subscription in Apollo 3 w/graphql-ws (Requires Apollo Client > v3.5.10) */
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
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
                // console.log("Subscription Context", ctx);
                // console.log("Subscription Message", msg);
                // console.log("Subscription Arguments", args);

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
        /* GraphQL Playground is Deprecated in Apollo 3: https://www.apollographql.com/docs/apollo-server/migration/#graphql-playground */
        /* playground: true, */
        /* GraphQL Introspection: Information About the Underlying Schema (A Discovery and Diagnostic Tool in Development Phase, Not in Production Phase) */
        /* - Ref: https://www.apollographql.com/blog/graphql/security/why-you-should-disable-graphql-introspection-in-production/ */
        /* introspection: true, */
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
    apollo.applyMiddleware({ app });
    
    /* Express Static: http://expressjs.com/ko/starter/static-files.html */
    app.use("/static", express.static("uploads"));

    if (process.env.NODE_ENV === "production") {
        app.use(express.static("client/build"));
    }

    app.get(/.*/, (req, res) => {
        res.sendFile(__dirname + "/client/build/server.js");
    });

    await new Promise(r => {
        httpServer.listen({ port: PORT }, r);
    });

    console.log(`Server is Ready at http://localhost:${PORT}${apollo.graphqlPath}`);
}

startServer();

/* server.listen(PORT).then(() => {
    console.log(`Server is Ready at http://localhost:${PORT}`);
}); */

/* Heroku */
/* - Getting Started: https://devcenter.heroku.com/articles/getting-started-with-nodejs?singlepage=true */
/* - Environment: https://devcenter.heroku.com/articles/config-vars */
/* - Postgres: https://devcenter.heroku.com/articles/heroku-postgresql#set-up-postgres-on-windows */
/* - Apollo GraphQL <> Heroku: https://www.apollographql.com/docs/apollo-server/deployment/heroku/ */

/* File Upload: Multipart Request (Not Working) -> Signed URL */
/* - Give the Client a Temporary URL for Uploading a File Directly (Bypass the GraphQL Server) */
/* - Scalability (Don't Use Multipart Upload Requests in a Real Project) */
/* - Doc (Official): https://www.apollographql.com/blog/backend/file-uploads/file-upload-best-practices */
/* - Doc (GraphQL S3): https://github.com/graphql-services/graphql-files-s3 */
/* - ENG 1: https://wundergraph.com/blog/graphql_file_uploads_evaluating_the_5_most_common_approaches#combining-a-graphql-api-with-a-dedicated-s3-storage-api */
/* - ENG 2: https://stackoverflow.com/questions/69012648/use-pre-signed-urls-to-upload-files-to-amazon-s3-hasura-actions-reacjs */
/* - KOR 1: https://velog.io/@mimi0905/Presigned-URL%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-S3%EB%A1%9C-%ED%8C%8C%EC%9D%BC-%EC%97%85%EB%A1%9C%EB%93%9C */
/* - KOR 2: https://velog.io/@godkimchichi/AWS-S3-presigned-url%EB%A1%9C-%EC%97%85%EB%A1%9C%EB%93%9C%EC%8B%9C-%ED%8C%8C%EC%9D%BC%EC%9D%B4-%EA%B9%A8%EC%A7%88-%EB%95%8C */
