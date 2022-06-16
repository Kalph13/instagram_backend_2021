import { gql } from "apollo-server";

export default gql`
    type CreateCommentResult {
        createCommentSucceed: Boolean!
        cerateCommentError: String
    }
    type Mutation {
        createComment(photoID: Int!, payload: String!): CreateCommentResult!
    }
`;