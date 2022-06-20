import { gql } from "apollo-server";

export default gql`
    type MutationResponse {
        mutationSucceed: Boolean!
        mutationID: Int
        mutationError: String
    }
`;