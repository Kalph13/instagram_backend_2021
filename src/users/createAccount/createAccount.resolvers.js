import client from "../../client";
import bcrypt from "bcrypt";

export default {
    Mutation: {
        createAccount: async (_, { firstName, lastName, username, email, password }) => {
            try {
                /* Check If the Same Username or Email is Already on the DB */
                const existingUser = await client.user.findFirst({
                    where: { OR: [ { username }, { email } ] }
                });

                if (existingUser) {
                    /* throw new Error("The Username or Email is Already Taken"); */
                    return {
                        createAccountSucceed: false,
                        createAccountError: "The Username or Password is Already Taken"
                    }
                };

                /* bcrypt: Hash Password (https://www.npmjs.com/package/bcrypt) */
                const passwordHash = await bcrypt.hash(password, 10);
                
                /* Create and Return the User */
                const createdUser = await client.user.create({
                    data: {
                        username,
                        email,
                        firstName,
                        lastName,
                        password: passwordHash,
                    }
                });

                return {
                    createAccountSucceed: true
                }
            } catch (e) {
                return {
                    createAccountSucceed: false,
                    createAccountError: "Could Not Create the User"
                }
            }
        }
    }
};