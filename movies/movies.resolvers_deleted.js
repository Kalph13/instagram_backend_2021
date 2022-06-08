import client from '../client';

/* Prisma Client API: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference */
/* findUnique(): Returns a Single Record */
/* findMany(): Returns a List of Records */
export default {
    Query: {
        movies: () => client.movie.findMany(),
        movie: (_, { id }) => client.movie.findUnique({ where: { id }})
    },
    Mutation: {
        createMovie: (_, { title, year, genre }) => client.movie.create({
            data: {
                title,
                year,
                genre
            }
        }),
        deleteMovie: (_, { id }) => client.movie.delete({ where: { id }}),
        updateMovie: (_, { id, year }) => client.movie.update({ where: { id }, data: { year }})
    }
};
