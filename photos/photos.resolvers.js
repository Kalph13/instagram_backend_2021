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
            return client.hashtag.findUnique({
                where: {
                    id: id
                }
            })
        },
        totalPhotos: ({ id }) => {
            return client.photo.count({
                where: {
                    hashtag: {
                        some: {
                            id: id
                        }
                    }
                }
            })
        }
    }
}