import { gql } from "apollo-server";

export default gql`
    type DeleteCommentResult {
        deleteCommentSucceed: Boolean!
        deleteCommentError: String
    }
    type Mutation {
        deleteComment(id: Int!): DeleteCommentResult!
    }
`;