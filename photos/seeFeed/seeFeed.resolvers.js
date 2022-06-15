import client from "../../client";
import { protectResolver } from "../../users/users.utils";

export default {
    Query: {
        seeFeed: protectResolver(async (_, __, { loggedInUser }) => {
            return await client.photo.findMany({
                where: {
                    OR: [
                        {
                            user: {
                                followers: {
                                    some: {
                                        id: loggedInUser.id
                                    }
                                }
                            }
                        },
                        {
                            userID: loggedInUser.id
                        }
                    ]
                },
                orderBy: {
                    createdAt: "desc"
                }
            });
        })
    }
};