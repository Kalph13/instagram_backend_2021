import client from "../client";

export default {
    Photo: {
        /* @relations Values (user, hashtags and likes) Appear in Prisma but Don't Appear in GraphQL Query */
        /* Below Codes Enable GraphQL to Get @relations Value */
        user: async ({ userID }) => {
            return await client.user.findUnique({
                where: {
                    id: userID
                }
            })
        },
        hashtags: async ({ id }) => {
            return await client.hashtag.findMany({
                where: {
                    photos: {
                        some: {
                            id: id
                        }
                    }
                }
            })
        },
        likes: async ({ id }) => {
            return await client.like.count({
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
        },
        comments: async ({ id }) => {
            return await client.comment.findMany({
                where: {
                    photoID: id
                },
                include: {
                    user: true
                }
            });
        },
        commentsNumber: async ({ id }) => {
            return await client.comment.count({
                where: {
                    photoID: id
                }
            });
        },
        isMine: ({ userID }, _, { loggedInUser }) => {
            if (!loggedInUser) {
                return false;
            }
            return userID === loggedInUser.id;
        },
        isLiked: async ({ id }, _, { loggedInUser }) => {
            if (!loggedInUser) {
                return false;
            }

            const checkLiked = await client.like.findUnique({
                where: {
                    photoID_userID: {
                        photoID: id,
                        userID: loggedInUser.id
                    }
                },
                select: {
                    id: true
                }
            });

            if (checkLiked) {
                return true;
            }

            return false;
        }
    },
    Hashtag: {
        photos: async ({ id }, { page }, { loggedInUser }) => {
            /* id: id of the Hashtag */
            return await client.hashtag.findUnique({
                where: {
                    id: id
                }
            }).photos();
            /* 'photos' Returns Null Because It's @relation */
            /* This Forces 'photo' to Return Value (Not an Iterative Function) */
        },
        totalPhotos: async ({ id }) => {
            return await client.photo.count({
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