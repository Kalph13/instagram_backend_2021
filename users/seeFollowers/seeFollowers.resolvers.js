import client from "../../client";

export default {
    Query: {
        seeFollowers: async (_, { username, page }) => {
            const checkUsername = await client.user.findUnique({
                where: { username },
                select: { id: true }
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
                });
            
            const totalFollowers = await client.user.count({
                where: { following: { some: { username } } }
            });

            return {
                SeeFollowersSucceed: true,
                SeeFollowersData: followers,
                SeeFollowersTotalPages: Math.ceil(totalFollowers / followersPerPage)
            };
        }
    }
};