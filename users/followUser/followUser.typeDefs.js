import { gql } from 'apollo-server';

/* typeDef - schema.prisma Must be Synchronized */
export default gql`
    type FollowUserResult {
        FollowUserSucceed: Boolean!
        FollowUserError: String
    }
    type Mutation {
        followUser(
            username: String!
        ): FollowUserResult
    }
`;