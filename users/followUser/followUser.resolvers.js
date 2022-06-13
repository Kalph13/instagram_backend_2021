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
                        /* Connect: Connects a Record to an Existing Related Record */
                        /* Doc: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#connect */
                    }
                }
            })

            return {
                FollowUserSucceed: true
            }
        })
    }
};