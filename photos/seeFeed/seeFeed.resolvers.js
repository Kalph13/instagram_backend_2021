import client from "../../client";
import { protectResolver } from "../../users/users.utils";

export default {
    Query: {
        seeFeed: protectResolver(async (_, { offset }, { loggedInUser }) => {
            return await client.photo.findMany({
                take: 2,
                skip: offset,
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