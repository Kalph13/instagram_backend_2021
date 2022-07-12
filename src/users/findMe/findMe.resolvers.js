import client from "../../client";

export default {
    Query: {
        findMe: (_, __, { loggedInUser }) => {
            return client.user.findUnique({
                where: {
                    id: loggedInUser.id
                }
            });
        }
    }
};
