import client from "../../client";
import { protectResolver } from "../../users/users.utils";
import { extractHashtags } from "../photos.utils";

export default {
    Mutation: {
        editPhoto: protectResolver(async (_, { id, caption }, { loggedInUser }) => {
            const oldPhoto = await client.photo.findFirst({
                where: {
                    id,
                    userID: loggedInUser.id
                },
                include: {
                    hashtags: {
                        select: {
                            tag: true
                        }
                    }
                }
            });

            if (!oldPhoto) {
                return {
                    editPhotoSucceed: false,
                    editPhotoError: "Can't Find the Photo"
                }
            }

            const newPhoto = await client.photo.update({
                where: {
                    id
                },
                data: {
                    caption,
                    hashtags: {
                        disconnect: oldPhoto.hashtags,
                        ...(extractHashtags(caption) && { connectOrCreate: extractHashtags(caption) })
                    }
                }
            });

            return {
                editPhotoSucceed: true
            }
        })
    }
};