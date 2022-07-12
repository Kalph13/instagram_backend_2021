import client from "../../client";
import { protectResolver } from "../../users/users.utils";

export default {
    Mutation: {
        readMessage: protectResolver(async (_, { id }, { loggedInUser }) => {
            /* loggedInUser: The Receiver, Not the Sender */
            const checkMessage = await client.message.findFirst({
                /* findFirst: Cannot Use Multiple 'where' Args in 'findUnique' */
                where: {
                    id,
                    userID: {
                        not: loggedInUser.id
                    },
                    room: {
                        users: {
                            some: {
                                id: loggedInUser.id
                            }
                        }
                    }
                },
                select: {
                    id: true
                }
            });

            if (!checkMessage) {
                return {
                    readMessageSucceed: false,
                    readMessageError: "Can't Find the Message"
                }
            }

            await client.message.update({
                where: {
                    id
                },
                data: {
                    read: true
                }
            });

            return {
                readMessageSucceed: true
            }
        })
    }
};
