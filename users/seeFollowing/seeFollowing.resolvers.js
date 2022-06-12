import client from "../../client";

export default {
    Query: {
        seeFollowing: async (_, { username, lastID }) => {
            const checkUsername = await client.user.findUnique({
                where: { username },
                select: { id: true }
            });
            
            if (!checkUsername) {
                return {
                    SeeFollowingSucceed: false,
                    SeeFollowingError: "The User Doesn't Exist"
                }
            }
            
            const followingPerPage = 5;

            const following = await client.user
                .findUnique({ where: { username } })
                .following({
                    skip: lastID ? 1 : 0,
                    take: followingPerPage,
                    ...(lastID && { cursor: { id: lastID } })
                });
            
            return {
                SeeFollowingSucceed: true,
                SeeFollowingData: following,
            };
        }
    }
};