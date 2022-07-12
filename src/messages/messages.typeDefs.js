import { gql } from "apollo-server";

export default gql`
    type Room {
        id: Int!
        users: [User]
        messages: [Message]
        unreadTotal: Int!
        createdAt: String!
        updatedAt: String!
    }
    type Message {
        id: Int!
        payload: String!
        user: User
        userID: Int
        room: Room
        roomID: Int
        read: Boolean!
        createdAt: String!
        updatedAt: String!
    }
`;