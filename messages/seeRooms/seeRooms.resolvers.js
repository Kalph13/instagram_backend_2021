import client from "../../client";

export default {
    Query: {
        seeRooms: async (_, __, { loggedInUser }) => {
            console.log("------ SeeRooms Called ------ id:", loggedInUser.username);
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