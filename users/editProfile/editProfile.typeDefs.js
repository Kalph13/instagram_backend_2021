import { gql } from 'apollo-server';

/* GraphQL Upload in Apollo v3: https://www.apollographql.com/docs/apollo-server/data/file-uploads */
export default gql`
    scalar Upload
    type EditProfileResult {
        editProfileSucceed: Boolean!
        editProfileError: String
    }
    type File {
        filename: String!
        mimetype: String!
        encoding: String!
    }
    type Mutation {
        editProfile (
            firstName: String
            lastName: String
            username: String
            email: String
            password: String
            bio: String
            avatar: Upload
        ): EditProfileResult!
    }
`;