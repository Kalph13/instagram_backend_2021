import { gql } from "apollo-server";

export default gql`
    type ReadMessageResult {
        readMessageSucceed: Boolean!
        readMessageError: String
    }
    type Mutation {
        readMessage(id: Int!): ReadMessageResult!
    }
`;