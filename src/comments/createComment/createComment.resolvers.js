import client from "../../client";
import { protectResolver } from "../../users/users.utils";

export default {
    Mutation: {
        createComment: protectResolver(async (_, { photoID, payload }, { loggedInUser }) => {
            const commentedPhoto = await client.photo.findUnique({
                where: {
                    id: photoID
                },
                select: {
                    id: true
                }
            });

            if (!commentedPhoto) {
                return {
                    createCommentSucceed: false,
                    createCommentError: "Can't Find the Photo"
                }
            }
            
            if (!payload) {
                return {
                    createCommentSucceed: false,
                    createCommentError: "Please Write a Comment"
                }
            }

            const newComment = await client.comment.create({
                data: {
                    payload,
                    user: {
                        connect: {
                            id: loggedInUser.id
                        }
                    },
                    photo: {
                        connect: {
                            id: photoID
                        }
                    }
                    /* userID and photoID Don't Need to be Assigned Here (Automatically Matched via 'connect' */
                    /* userID: loggedInUser.id, */
                    /* photoID */
                }
            });

            return {
                createCommentSucceed: true,
                createCommentID: newComment.id
            };
        })
    }
};