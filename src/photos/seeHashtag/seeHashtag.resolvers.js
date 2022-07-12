import client from "../../client";

export default {
    Query: {
        seeHashtag: (_, { tag }) => {
            return client.hashtag.findUnique({
                where: {
                    tag: tag
                }
            })
        }
    }
};
