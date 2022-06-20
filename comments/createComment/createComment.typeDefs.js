import { gql } from "apollo-server";

export default gql`
    type CreateCommentResult {
        createCommentSucceed: Boolean!
        createCommentID: Int
        cerateCommentError: String
    }
    type Mutation {
        createComment(photoID: Int!, payload: String!): CreateCommentResult!
    }
`;