import client from "../../client"
import { protectResolver } from "../../users/users.utils";
import { extractHashtags } from "../photos.utils";

export default {
    Mutation: {
        uploadPhoto: protectResolver(async (_, { file, caption }, { loggedInUser }) => {
            let hashtagObj = [];
            
            /* Parse Caption and Get or Create Hashtags */
            if (caption) {
                hashtagObj = extractHashtags(caption);
            }

            /* Save the Photo with the Parsed Hashtags */
            return await client.photo.create({
                data: {
                    file,
                    caption,
                    user: {
                        connect: {
                            id: loggedInUser.id
                        }
                    },
                    ...(hashtagObj.length > 0 && {
                        hashtags: {
                            connectOrCreate: hashtagObj
                        }
                    })
                }
            });
        })
    }
};