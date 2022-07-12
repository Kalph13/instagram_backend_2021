import client from "../../client";
import { protectResolver } from "../../users/users.utils";

export default {
    Mutation: {
        toggleLike: protectResolver(async (_, { id }, { loggedInUser }) => {
            /* Find the Photo that the User Liked */
            const likedPhoto = await client.photo.findUnique({
                where: {
                    id
                }
            });

            if (!likedPhoto) {
                return {
                    toggleLikeSucceed: false,
                    toggleLikeError: "Can't Find the Photo"
                }
            }

            /* photoID: ID of the Liked Photo */
            /* userID: ID of the User Who Liked the Photo */
            const likeIDs = {
                /* The Name Matters: Must be 'photoID_userID' */
                /* In schema.prisma: @@unique([photoID, userID]) */
                /* In migration.sql: CREATE UNIQUE INDEX "Like_photoID_userID_key" ON "Like"("photoID", "userID") */
                photoID_userID: {
                    photoID: id,
                    userID: loggedInUser.id
                }
            };

            /* Check Whether the User Liked the Photo Before */
            const likeObj = await client.like.findUnique({
                where: likeIDs
            });

            if (likeObj) {
                /* Unlike */
                await client.like.delete({
                    where: likeIDs
                });
            } else {
                /* Like */
                await client.like.create({
                    data: {
                        user: {
                            connect: {
                                id: loggedInUser.id
                            }
                        },
                        photo: {
                            connect: {
                                id: likedPhoto.id
                            }
                        }
                    }
                });
            }

            return {
                toggleLikeSucceed: true
            }
        })
    }
}