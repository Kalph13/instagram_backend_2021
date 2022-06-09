import { gql } from 'apollo-server';

/* typeDef - schema.prisma Must be Synchronized */
export default gql`
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
