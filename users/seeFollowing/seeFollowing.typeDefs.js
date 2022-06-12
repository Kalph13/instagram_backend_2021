import { gql } from 'apollo-server';

/* typeDef - schema.prisma Must be Synchronized */
export default gql`
    type SeeFollowingResult {
        SeeFollowingSucceed: Boolean!
        SeeFollowingError: String
        SeeFollowingData: [User]
    }
    type Query {
        seeFollowing(
            username: String!
            lastID: Int
        ): SeeFollowingResult!
    }
`;