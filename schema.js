/* GraphQL Tools: https://www.graphql-tools.com */
/* 'graphql-tools' id Deprecated → Use ''@graphql-tools/schema', '@graphql-tools/load-files', '@graphql-tools/merge' */
import { makeExecutableSchema } from '@graphql-tools/schema';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';

/* loadFilesSync(): Find and Merge All typeDefs, queries, mutations Files in an Array */
const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.js`);

/* mergeTypeDefs: Build an Integrated typeDefs */
/* mergeResolvers: Build an Integrated resolvers */
const typeDefs = mergeTypeDefs(loadedTypes);
const resolvers = mergeResolvers(loadedResolvers);

/* makeExecutableSchema: Build a Schema by Combining typeDefs and resolvers */
const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;