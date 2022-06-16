import client from "../../client";

export default {
    Query: {
        seePhotoComments: async (_, { id }) => {
            return await client.comment.findMany({
                where: {
                    photoID: id
                },
                orderBy: {
                    createdAt: "asc"
                }
            });
        }
    }
}