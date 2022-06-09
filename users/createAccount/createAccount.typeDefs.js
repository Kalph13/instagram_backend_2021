import { gql } from 'apollo-server';

/* typeDef - schema.prisma Must be Synchronized */
export default gql`
    type CreateAccountResult {
        createAccountSucceed: Boolean!
        createAccountError: String
    }
    type Mutation {
        createAccount(
            firstName: String!
            lastName: String
            username: String!
            email: String!
            password: String!
        ): CreateAccountResult!
    }
`;