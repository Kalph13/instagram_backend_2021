import client from "../../client";
import { protectResolver } from "../../users/users.utils";



export default {
    Query: {
        seePhotoLikes: protectResolver(async (_, { id }) => {
            const likeObj = await client.like.findMany({
                where: {
                    photoID: id
                },
                select: {
                    id: true,
                    photoID: true,
                    photo: true,
                    user: true
                }
                /*
                    likeObj without select: { user: true } (Return All Fields Except @relation)
                    [
                        {
                            id: 1,
                            photoID: 7,
                            userID: 14,
                            createdAt: 2022-06-15T09:08:02.354Z,
                            updatedAt: 2022-06-15T09:08:02.358Z
                        }
                    ]

                    likeObj with select: { user: true } (Return Only Selected Fields - Return 'user' in this Case )
                    [
                        {
                            user: {
                                id: 14,
                                firstName: 'Soonsoon',
                                lastName: 'Kim',
                                username: 'Trouble Maker',
                                email: 'soonsoon.kim@gmail.com',
                                password: '$2b$10$sAfP498xOjCsAAsmMKo/9.9MCyUPihHkjtRJgiWxNrnVOJLSksu4y',
                                bio: "I'm the King of Dogs",
                                avatar: null,
                                createdAt: 2022-06-14T21:42:28.509Z,
                                updatedAt: 2022-06-14T21:47:28.797Z
                            }
                        }
                    ]
                */
            })
            
            return likeObj.map(item => item.user);
        })
    }
};