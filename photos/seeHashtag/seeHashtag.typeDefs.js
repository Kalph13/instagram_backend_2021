import { gql } from 'apollo-server';

/* typeDef - schema.prisma Must be Synchronized */
export default gql`
    type Query {
        seeHashtag(hashtag: String!): Hashtag
    }
`;