import client from "../client"

export default {
    User: {
        photos: async ({ id }) => {
            return client.user.findUnique({
                where: {
                    id
                }
            }).photos();
            /* 'photos' Returns Null Because It's @relation */
            /* This Forces 'photo' to Return Value (Not an Iterative Function) */
        },
        totalFollowing: ({ id }) => {
            return client.user.count({
                where: {
                    followers: {
                        some: {
                            id
                        }
                    }
                }
            });
        },
        totalFollowers: ({ id }) => {
            return client.user.count({
                where: {
                    following: {
                        some: {
                            id
                        }
                    }
                }
            });
        },
        isMe: ({ id }, _, { loggedInUser }) => {
            if (!loggedInUser) {
                return false;
            }
            return id === loggedInUser.id;
        },
        isFollowing: async ({ id }, _, { loggedInUser }) => {
            if (!loggedInUser) {
                return false;
            }
            const result = await client.user.count({
                where: {
                    username: loggedInUser.username,
                    following: {
                        some: {
                            id
                        }
                    }
                }
            });
            return Boolean(result);
        }
    }
}