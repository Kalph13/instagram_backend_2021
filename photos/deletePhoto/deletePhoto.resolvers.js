import client from "../../client";
import { protectResolver } from "../../users/users.utils";

export default {
    Mutation: {
        deletePhoto: protectResolver(async (_, { id }, { loggedInUser }) => {
            const deletedPhoto = await client.photo.findUnique({
                where: {
                    id
                },
                select: {
                    userID: true
                }
            });

            if (!deletedPhoto) {
                return {
                    deletePhotoSucceed: false,
                    deletePhotoError: "Can't Find the Photo"
                };
            } else if (deletedPhoto.userID !== loggedInUser.id) {
                return {
                    deletePhotoSucceed: false,
                    deletePhotoError: "Can't Delete Other User's Photo"
                };
            } else {
                /* Can't Delete a Photo that Has Likes or Comments (@relation) */
                /* Use Referential Actions to Update or Delete a Related Record (Set 'onDelete: SetNull' in This Case) */
                /* - Doc: https://www.prisma.io/docs/concepts/components/prisma-schema/relations/referential-actions */
                await client.photo.delete({
                    where: {
                        id
                    }
                });

                return {
                    deletePhotoSucceed: true
                };
            }
        })
    }
};
