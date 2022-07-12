import client from "../../client";

export default {
    Query: {
        seeFollowers: async (_, { username, page }) => {
            const checkUsername = await client.user.findUnique({
                where: { username },
                select: { id: true }
                /* Select: Return a Limited Subset of Fields (Returns Only 'id' of the username in this Case) */
                /* - Doc: https://www.prisma.io/docs/concepts/components/prisma-client/select-fields */ 
            });

            if (!checkUsername) {
                return {
                    SeeFollowersSucceed: false,
                    SeeFollowersError: "The User Doesn't Exist"
                }
            }
            
            const followersPerPage = 5;

            const followers = await client.user
                .findUnique({ where: { username } })
                .followers({
                    skip: (page - 1) * followersPerPage,
                    take: followersPerPage
                    /* Pagination: https://www.prisma.io/docs/concepts/components/prisma-client/pagination#offset-pagination */
                });
            
            const totalFollowers = await client.user.count({
                where: { following: { some: { username } } }
                /* Some: Returns All Records Where At Least One Releated Record Matches Filtering Criteria */
            });

            return {
                SeeFollowersSucceed: true,
                SeeFollowersData: followers,
                SeeFollowersTotalPages: Math.ceil(totalFollowers / followersPerPage)
            };
        }
    }
};