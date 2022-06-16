import client from "../../client";
import { protectResolver } from "../../users/users.utils";

export default {
    Mutation: {
        deleteComment: protectResolver(async (_, { id }, { loggedInUser }) => {
            const deletedComment = await client.comment.findUnique({
                where: {
                    id
                }
            });

            if (!deletedComment) {
                return {
                    deleteCommentSucceed: false,
                    deleteCommentError: "Can't Find the Comment"
                }
            } else if (deletedComment.userID !== loggedInUser.id) {
                return {
                    deleteCommentSucceed: false,
                    deleteCommentError: "Can't Delete Other User's Comment"
                }
            } else {
                await client.comment.delete({
                    where: {
                        id
                    }
                });

                return {
                    deleteCommentSucceed: true
                }
            }
        })
    }
}