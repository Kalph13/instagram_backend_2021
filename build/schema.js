"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeDefs = exports.resolvers = void 0;

var _loadFiles = require("@graphql-tools/load-files");

var _merge = require("@graphql-tools/merge");

/* GraphQL Tools: https://www.graphql-tools.com */

/* 'graphql-tools' id Deprecated → Use ''@graphql-tools/schema', '@graphql-tools/load-files', '@graphql-tools/merge' */

/* import { makeExecutableSchema } from '@graphql-tools/schema'; */

/* loadFilesSync(): Find and Merge All typeDefs, queries, mutations Files in an Array */
var loadedTypes = (0, _loadFiles.loadFilesSync)("".concat(__dirname, "/**/*.typeDefs.js"));
var loadedResolvers = (0, _loadFiles.loadFilesSync)("".concat(__dirname, "/**/*.resolvers.js"));
/* mergeTypeDefs: Build an Integrated typeDefs */

/* mergeResolvers: Build an Integrated resolvers */

var typeDefs = (0, _merge.mergeTypeDefs)(loadedTypes);
exports.typeDefs = typeDefs;
var resolvers = (0, _merge.mergeResolvers)(loadedResolvers);
/* makeExecutableSchema: Build a Schema by Combining typeDefs and resolvers */

/* const schema = makeExecutableSchema({ typeDefs, resolvers });
export default schema; */

exports.resolvers = resolvers;