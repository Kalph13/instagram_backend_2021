import { gql } from 'apollo-server';

/* typeDef - schema.prisma Must be Synchronized */
export default gql`
    type Photo {
        id: Int!
        user: User!
        userID: Int!
        file: String!
        caption: String
        hashtags: [Hashtag]
        createdAt: String!
        updatedAt: String!
    }
    type Hashtag {
        id: Int!
        hashtag: Hashtag!
        photos(page: Int!): [Photo]
        totalPhotos: Int!
        createdAt: String!
        updatedAt: String!
    }
`;