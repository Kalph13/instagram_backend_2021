import client from "../client";

export default {
    Photo: {
        /* @relations Values (user, hashtags and likes) Appear in Prisma but Don't Appear in GraphQL Query */
        /* Below Codes Enable GraphQL to Get @relations Value */
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
        },
        likes: ({ id }) => {
            return client.like.count({
                where: {
                    photoID: id
                }
            });
            /* Guess This Also Works */
            /* return client.photo.count({
                where: {
                    likes: {
                        some: {
                            photoID: id
                        }
                    }
                }
            }); */
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