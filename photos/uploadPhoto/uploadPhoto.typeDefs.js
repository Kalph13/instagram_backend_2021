import { gql } from 'apollo-server';

/* typeDef - schema.prisma Must be Synchronized */
export default gql`
    type Mutation {
        uploadPhoto(file: String!, caption: String): Photo
    }
`;