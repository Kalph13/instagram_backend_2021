import client from "../client";

export default {
    Room: {
        users: async ({ id }) => {
            return await client.room.findUnique({
                where: {
                    id
                }
            }).users();
        },
        messages: async ({ id }) => {
            return await client.message.findMany({
                where: {
                    roomID: id
                }
            })
        },
        unreadTotal: async ({ id }, _, { loggedInUser }) => {
            return await client.message.count({
                where: {
                    read: false,
                    roomID: id,
                    user: {
                        id: {
                            not: loggedInUser.id
                        }
                    }
                }
            })
        }
    },
    Message: {
        user: async ({ id }) => {
            return await client.message.findUnique({
                where: {
                    id
                }
            }).user();
        },
        room: async ({ id }) => {
            return await client.message.findUnique({
                where: {
                    id
                }
            }).room();
        }
    }
}