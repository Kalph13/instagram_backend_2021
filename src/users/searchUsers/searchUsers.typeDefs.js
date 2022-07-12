import { gql } from 'apollo-server';

/* typeDef - schema.prisma Must be Synchronized */
export default gql`
    type Query {
        searchUsers(keyword: String!): [User]
    }
`;
