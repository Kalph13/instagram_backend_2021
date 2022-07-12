import { gql } from 'apollo-server';

/* typeDef - schema.prisma Must be Synchronized */
export default gql`
    type UnfollowUserResult {
        UnfollowUserSucceed: Boolean!
        UnfollowUserError: String
    }
    type Mutation {
        unfollowUser(
            username: String!
        ): UnfollowUserResult
    }
`;