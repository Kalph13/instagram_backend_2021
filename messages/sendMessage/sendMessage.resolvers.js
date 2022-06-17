import client from "../../client";
import { protectResolver } from "../../users/users.utils";

export default {
    Mutation: {
        sendMessage: protectResolver(async (_, { userID, roomID, payload }, { loggedInUser }) => {
            let room = null;

            if (userID) {
                const invitedUser = await client.user.findUnique({
                    where: {
                        id: userID
                    },
                    select: {
                        id: true
                    }
                });

                if (!invitedUser) {
                    return {
                        sendMessageSucceed: false,
                        sendMessageError: "Can't Find the User"
                    }
                }

                room = await client.room.create({
                    data: {
                        users: {
                            connect: [
                                {
                                    id: userID
                                },
                                {
                                    id: loggedInUser.id
                                }
                            ]
                        }
                    }
                });
            } else if (roomID) {
                room = await client.room.findUnique({
                    where: {
                        id: roomID 
                    }
                });

                if (!room) {
                    return {
                        sendMessageSucceed: false,
                        sendMessageError: "Can't Find the Room"
                    }
                }
            }

            await client.message.create({
                data: {
                    payload,
                    user: {
                        connect: {
                            id: loggedInUser.id
                        }
                    },
                    room: {
                        connect: {
                            id: room.id
                        }
                    }
                }
            });

            return {
                sendMessageSucceed: true
            };
        })
    }
}