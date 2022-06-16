import { gql } from "apollo-server";

export default gql`
    type DeletePhotoResult {
        deletePhotoSucceed: Boolean!
        deletePhotoError: String
    }
    type Mutation {
        deletePhoto(id: Int!): DeletePhotoResult!
    }
`;