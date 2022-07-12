import { gql } from "apollo-server";

export default gql`
    type EditPhotoResult {
        editPhotoSucceed: Boolean!
        editPhotoError: String
    }
    type Mutation {
        editPhoto(id: Int!, caption: String!): EditPhotoResult!
    }
`;