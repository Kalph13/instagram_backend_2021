import { gql } from "apollo-server";

export default gql`
    type ToggleLikeResult {
        toggleLikeSucceed: Boolean!
        toggleLikeError: String
    }
    type Mutation {
        toggleLike(id: Int!): ToggleLikeResult!
    }
`;