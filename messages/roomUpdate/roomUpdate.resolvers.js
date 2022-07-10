import client from "../../client";
import pubsub from "../../pubsub";
import { NEW_MESSAGE } from "../../constants"
import { withFilter } from "graphql-subscriptions";

/* Listening for Events: https://www.apollographql.com/docs/apollo-server/data/subscriptions/#listening-for-events */
export default {
    Subscription: {
        roomUpdate: {
            subscribe: async (root, arg, context, info) => {
                console.log("------ RoomUpdate Called ------");
                const checkRoom = await client.room.findFirst({
                    where: {
                        id: arg.id,
                        users: {
                            some: {
                                id: context.loggedInUser.id
                            }
                        }
                    },
                    select: {
                        id: true
                    }
                });

                if (!checkRoom) {
                    throw new Error("You Shall Not See This");
                }
                
                /* Filtering Events: https://www.apollographql.com/docs/apollo-server/data/subscriptions/#filtering-events */
                return withFilter(
                    () => pubsub.asyncIterator(NEW_MESSAGE),
                    async ({ roomUpdate }, { id }, { loggedInUser }) => {
                        if (roomUpdate.roomID === id) {
                            const subscribedRoom = await client.room.findFirst({
                                where: {
                                    id,
                                    users: {
                                        some: {
                                            id: loggedInUser.id
                                        }
                                    }
                                },
                                select: {
                                    id: true
                                }
                            });

                            if (!subscribedRoom) {
                                return false;
                            }

                            return true;
                        }
                    }
                )(root, arg, context, info);
            }
        }
    }
}