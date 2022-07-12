import client from "../../client";
import { protectResolver } from "../../users/users.utils";

export default {
    Mutation: {
        editComment: protectResolver(async (_, { id, payload }, { loggedInUser }) => {
            const editedComment = await client.comment.findUnique({
                where: {
                    id
                },
                select: {
                    userID: true
                }
            });

            if (!editedComment) {
                return {
                    editCommentSucceed: false,
                    editCommentError: "Can't Find the Comment"
                };
            } else if (editedComment.userID !== loggedInUser.id) {
                return {
                    editCommentSucceed: false,
                    editCommentError: "Can't Edit Other User's Comment"
                };
            } else {
                await client.comment.update({
                    where: {
                        id
                    },
                    data: {
                        payload
                    }
                });

                return {
                    editCommentSucceed: true
                }
            }
        })
    }
}