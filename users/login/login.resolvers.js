import client from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
    Mutation: {
        login: async (_, { username, password }) => {
            const user = await client.user.findFirst({ where: { username } });

            if (!user) {
                return {
                    loginSucceed: false,
                    loginError: "Username Not Found"
                };
            };

            const passwordCompare = await bcrypt.compare(password, user.password);

            if (!passwordCompare) {
                return {
                    loginSucceed: false,
                    loginError: "Incorrect Password"
                };
            };

            /* JSON Web Token: https://jwt.io */
            /* - Doc: https://github.com/auth0/node-jsonwebtoken */
            /* - Ref: https://mangkyu.tistory.com/56 */
            const jwtToken = jwt.sign({ id: user.id }, process.env.SECRET_KEY);

            return {
                loginSucceed: true,
                loginToken: jwtToken
            };
        }
    }
};