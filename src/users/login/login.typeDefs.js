import { gql } from 'apollo-server';

/* typeDef - schema.prisma Must be Synchronized */
export default gql`
    type LoginResult {
        loginSucceed: Boolean!
        loginError: String
        loginToken: String
    }
    type Mutation {
        login (
            username: String!
            password: String!
        ): LoginResult!
    }
`;
