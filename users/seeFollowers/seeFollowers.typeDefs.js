import { gql } from 'apollo-server';

/* typeDef - schema.prisma Must be Synchronized */
export default gql`
    type SeeFollowersResult {
        SeeFollowersSucceed: Boolean!
        SeeFollowersError: String
        SeeFollowersData: [User]
        SeeFollowersTotalPages: Int
    }
    type Query {
        seeFollowers(
            username: String!
            page: Int!
        ): SeeFollowersResult!
    }
`;