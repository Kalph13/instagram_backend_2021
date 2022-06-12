import client from "../../client";
import { protectResolver } from "../users.utils";

export default {
    Mutation: {
        followUser: protectResolver(async (_, { username }, { loggedInUser }) => {
            const checkUsername = await client.user.findUnique({ where: { username } });
            
            if (!checkUsername) {
                return {
                    FollowUserSucceed: false,
                    FollowUserError: "The User Doesn't Exist"
                }
            }

            await client.user.update({
                where: { id: loggedInUser.id },
                data: {
                    following: {
                        connect: {
                            username
                        }
                    }
                }
            })

            return {
                FollowUserSucceed: true
            }
        })
    }
};