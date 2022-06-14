import client from "../client";

export default {
    Photo: {
        user: ({ userID }) => client.user.findUnique({ where: { id: userID } }),
        hashtags: ({ id }) =>
            client.hashtag.findMany({
                where: {
                    photos: {
                        some: {
                            id
                        }
                    }
                }
            })
    }
}