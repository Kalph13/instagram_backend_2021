import client from "../../client";
import { protectResolver } from "../../users/users.utils";
import pubsub from "../../pubsub";
import { NEW_MESSAGE } from "../../constants";

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

           const newMessage = await client.message.create({
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

            console.log("------ SendMessage Called ------ id:", loggedInUser.username)
            console.log("newMessage: ", newMessage.payload);

            /* Publishing Events: https://www.apollographql.com/docs/apollo-server/data/subscriptions/#publishing-an-event */
            pubsub.publish(NEW_MESSAGE, { 
                roomUpdate: {
                    ...newMessage
                }
            });

            return {
                sendMessageSucceed: true,
                sendMessageID: newMessage.id
            };
        })
    }
}