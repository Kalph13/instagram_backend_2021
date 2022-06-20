import { gql } from "apollo-server";

export default gql`
    type SendMessageResult {
        sendMessageSucceed: Boolean!
        sendMessageID: Int
        sendMessageError: String
    }
    type Mutation {
        sendMessage(userID: Int, roomID: Int, payload: String!): SendMessageResult!
    }
`;