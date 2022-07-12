import { gql } from "apollo-server";

export default gql`
    type EditCommentResponse {
        editCommentSucceed: Boolean!
        editCommentError: String
    }
    type Mutation {
        editComment(id: Int!, payload: String!): EditCommentResponse!
    }
`;