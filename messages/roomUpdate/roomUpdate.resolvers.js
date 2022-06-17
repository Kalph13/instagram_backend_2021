import pubsub from "../../pubsub";
import { NEW_MESSAGE } from "../../constants"

/* Listening for Events: https://www.apollographql.com/docs/apollo-server/data/subscriptions/#listening-for-events */
export default {
    Subscription: {
        roomUpdate: {
            subscribe: () => pubsub.asyncIterator(NEW_MESSAGE)
        }
    }
}