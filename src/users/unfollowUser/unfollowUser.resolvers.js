import client from "../../client";
import { protectResolver } from "../users.utils";

export default {
    Mutation: {
        unfollowUser: protectResolver(async (_, { username }, { loggedInUser }) => {
            const checkUsername = await client.user.findUnique({ where: { username } });
            
            if (!checkUsername) {
                return {
                    UnfollowUserSucceed: false,
                    UnfollowUserError: "Can't Unfollow the User"
                }
            }

            await client.user.update({
                where: { id: loggedInUser.id },
                data: {
                    following: {
                        disconnect: {
                            username
                        }
                    }
                }
            })

            return {
                UnfollowUserSucceed: true
            }
        })
    }
};