import { gql } from "apollo-server";

export default gql`
    type Comment {
        id: Int!
        payload: String!
        user: User
        userID: Int
        photo: Photo
        photoID: Int
        createdAt: String!
        updatedAt: String!
        isMine: Boolean!
    }
`;