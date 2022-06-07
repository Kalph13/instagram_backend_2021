/* Babel (Enables ES6 Syntax) is Required to Use 'import' */
/* Babel Install: npm install @babel/node @babel/preset-env @babel/core -D */
/* Babel Setting: Create babel.config.json ("preset") and Modify the Run Script (node server.js → babel-node server) */
import { ApolloServer, gql } from 'apollo-server';
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

/* typeDef - schema.prisma Must be Identical */
const typeDefs = gql`
    type Movie {
        id: Int!
        title: String!
        year: Int!
        genre: String
        createAt: String!
        updatedAt: String!
    }
    type Query {
        movies: [Movie]
        movie(id: Int!): Movie
    }
    type Mutation {
        createMovie(title: String!, year: Int!, genre: String): Movie
        deleteMovie(id: Int!): Movie
        updateMovie(id: Int!, year: Int!): Movie
    }
`;

/* Prisma Client API: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference */
/* findUnique(): Returns a Single Record */
/* findMany(): Returns a List of Records */
const resolvers = {
    Query: {
        movies: () => client.movie.findMany(),
        movie: (_, { id }) => client.movie.findUnique({ where: { id }})
    },
    Mutation: {
        createMovie: (_, { title, year, genre }) => client.movie.create({
            data: {
                title,
                year,
                genre
            }
        }),
        deleteMovie: (_, { id }) => client.movie.delete({ where: { id }}),
        updateMovie: (_, { id, year }) => client.movie.update({ where: { id }, data: { year }})
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(() => {
    console.log(`Server is Ready at http://localhost:4000`);
});