import { gql } from 'apollo-server';

/* typeDef - schema.prisma Must be Synchronized */
export default gql`
    type User {
        id: String!
        firstName: String!
        lastName: String
        username: String!
        email: String!
        createdAt: String!
        updatedAt: String!
        bio: String
        avatar: String
    }
`;
