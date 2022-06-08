import client from "../client";
import bcrypt from "bcrypt";

/* Prisma Client API: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference */
/* findUnique(): Returns a Single Record */
/* findMany(): Returns a List of Records */
export default {
    Query: {
        seeProfile: (_, { username }) => {     
            return client.user.findUnique({
                where: { username }
            });
        }
    },
    Mutation: {
        createAccount: async (_, { firstName, lastName, username, email, password }) => {
            try {
                /* Check If the Same Username or Email is Already on the DB */
                const existingUser = await client.user.findFirst({
                    where: { OR: [ { username }, { email } ] }
                });

                if (existingUser) {
                    throw new Error("This Username or Password is Already Taken");
                };

                /* bcrypt: Hash Password (https://www.npmjs.com/package/bcrypt) */
                const passwordHash = await bcrypt.hash(password, 10);
                
                /* Create and Return the User */
                return client.user.create({
                    data: {
                        username,
                        email,
                        firstName,
                        lastName,
                        password: passwordHash
                    }
                });
            } catch (e) {
                return e;
            }
        }
    }
};