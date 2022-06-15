import client from "../../client";

export default {
    Query: {
        seeProfile: (_, { username }) => {     
            return client.user.findUnique({
                where: { username },
                include: {
                    following: true,
                    followers: true
                }
                /* select: Returns Only Selected Values */
                /* include: Returns Original Return Values and Included Values Together */
            });
        }
    }
};