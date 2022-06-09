import client from "../../client";
import bcrypt from "bcrypt";
import { protectResolver } from "../users.utils";

const editProfile = async (_, { firstName, lastName, username, email, password: newPassword}, { loggedInUser }) => {
    let passwordHash = null;
    
    if (newPassword) {
        passwordHash = await bcrypt.hash(newPassword, 10);
    };

    const updatedUser = await client.user.update({
        where: { id: loggedInUser.id },
        data: {
            firstName,
            lastName,
            username,
            email,
            /* Return { password: passwordHash} When passwordHash is True */
            /* Return passwordHash When passwordHash is False */
            ...(passwordHash && { password: passwordHash })
        }
    });

    if (updatedUser.id) {
        return {
            editProfileSucceed: true
        };
    } else {
        return {
            editProfileSucceed: false,
            editProfileError: "Could Not Update the Profile"
        };
    };
}

export default {
    Mutation: {
        editProfile: protectResolver(editProfile)
    }
};