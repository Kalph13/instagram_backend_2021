import client from "../client";

export default {
    Photo: {
        user: ({ userID }) => {
            return client.user.findUnique({
                where: {
                    id: userID
                }
            })
        },
        hashtags: ({ id }) => {
            return client.hashtag.findMany({
                where: {
                    photos: {
                        some: {
                            id: id
                        }
                    }
                }
            })
        }
    },
    Hashtag: {
        photos: ({ id }, { page }, { loggedInUser }) => {
            /* id: id of the Input Hashtag */
            return client.hashtag.findUnique({
                where: {
                    id: id
                }
            }).photos();
        },
        totalPhotos: ({ id }) => {
            return client.photo.count({
                where: {
                    hashtags: {
                        some: {
                            id: id
                        }
                    }
                }
            });
        }
    }
}