import client from "../../client"
import { protectResolver } from "../../users/users.utils";

export default {
    Mutation: {
        uploadPhoto: protectResolver(async (_, { file, caption }, { loggedInUser }) => {
            let hashtagObj = [];
            
            /* Parse Caption and Get or Create Hashtags */
            if (caption) {
                const hashtags = caption.match(/#[\w]+/g);
                hashtagObj = hashtags.map(hashtag => ({
                    where: { hashtag },
                    create: { hashtag }
                }));
            }

            /* Save the Photo with the Parsed Hashtags */
            return client.photo.create({
                data: {
                    file,
                    caption,
                    user: {
                        connect: {
                            id: loggedInUser.id
                        }
                    },
                    ...(hashtagObj.length > 0 && {
                        hashtag: {
                            connectOrCreate: hashtagObj
                        }
                    })
                }
            });
        })
    }
};