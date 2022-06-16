import { gql } from 'apollo-server';

/* typeDef - schema.prisma Must be Synchronized */
export default gql`
    type Photo {
        id: Int!
        user: User!
        userID: Int!
        file: String!
        caption: String
        likes: Int!
        comments: Int!
        hashtags: [Hashtag]
        createdAt: String!
        updatedAt: String!
        isMine: Boolean!
    }
    type Hashtag {
        id: Int!
        tag: String!
        photos(page: Int!): [Photo]
        totalPhotos: Int!
        createdAt: String!
        updatedAt: String!
    }
    type Like {
        id: Int!
        photo: Photo!
        createdAt: String!
        updatedAt: String!
    }
`;