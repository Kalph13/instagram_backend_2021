import { gql } from 'apollo-server';

export default gql`
    type EditProfileResult {
        editProfileSucceed: Boolean!
        editProfileError: String
    }
    type Mutation {
        editProfile (
            firstName: String
            lastName: String
            username: String
            email: String
            password: String
        ): EditProfileResult!
    }
`;