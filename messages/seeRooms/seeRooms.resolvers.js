import client from "../../client";

export default {
    Query: {
        seeRooms: async (_, __, { loggedInUser }) => {
            return await client.room.findMany({
                where: {
                    users: {
                        some: {
                            id: loggedInUser.id
                        }
                    }
                }
            });
        }
    }
}