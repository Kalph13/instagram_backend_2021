import client from "../../client";

export default {
    Query: {
        seeFollowing: async (_, { username, lastID }) => {
            const checkUsername = await client.user.findUnique({
                where: { username },
                select: { id: true }
                /* Select: Return a Limited Subset of Fields (Returns Only 'id' of the username in this Case) */
                /* - Doc: https://www.prisma.io/docs/concepts/components/prisma-client/select-fields */ 
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
                    /* 1: Skip the Cursor */
                    /* 2: Don't Skip the Cursor (In this Case, Start From the Beginning) */
                    take: followingPerPage,
                    /* Pagination: https://www.prisma.io/docs/concepts/components/prisma-client/pagination#offset-pagination */
                    ...(lastID && { cursor: { id: lastID } })
                    /* Cursor: Return a Limited Set of Result Before or After a Given Cursor */
                });
            
            return {
                SeeFollowingSucceed: true,
                SeeFollowingData: following,
            };
        }
    }
};