import client from "../../client";
import bcrypt from "bcrypt";
/* import { createWriteStream } from "fs"; */
import { protectResolver } from "../users.utils";
import { uploadToS3 } from "../../shared/shared.utils";

/* Modify package.json Before Using graphql-upload (https://stackoverflow.com/questions/72361047/error-no-exports-main-defined-in-graphql-upload-package-json) */
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";

const editProfile = async (_, { firstName, lastName, username, email, password: newPassword, bio, avatar }, { loggedInUser }) => {    
    let avatarURL = null;

    /* Seemingly Cannot Test 'Upload' on Apollo Studio: Re-test After the Client is Built */
    if (avatar) {
        /* const { filename, createReadStream } = await avatar;
        const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
        const readStream = createReadStream();
        const writeStream = createWriteStream(process.cwd() + "/uploads/" + newFilename);
        readStream.pipe(writeStream);
        avatarURL = `http://localhost:4000/static/${newFilename}`; */
        
        /* Photo Upload with AWS S3 */
        avatarURL = await uploadToS3(avatar, loggedInUser.id, "avatars");
    }
    
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
            bio,
            /* Return { password: passwordHash} When passwordHash is True */
            /* Return passwordHash When passwordHash is False */
            ...(passwordHash && { password: passwordHash }),
            ...(avatarURL && { avatar: avatarURL })
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

/* GraphQL Upload in Apollo v3: https://www.apollographql.com/docs/apollo-server/data/file-uploads */
export default {
    Upload: GraphQLUpload,
    Mutation: {
        editProfile: protectResolver(editProfile)
    }
};
