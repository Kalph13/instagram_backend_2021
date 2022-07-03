import AWS from "aws-sdk";

export const uploadToS3 = async (file, userID, folderName) => {
    AWS.config.update({
        credentials: {
            accessKeyId: process.env.AWS_KEY,
            secretAccessKey: process.env.AWS_SECRET
        }
    })
    
    const { filename, createReadStream } = await file;
    const readStream = createReadStream();
    const newFilename = `${folderName}/${userID}-${Date.now()}-${filename}`;
    const { Location } = await new AWS.S3()
        .upload({
            Bucket: "instagram-uploads",
            Key: newFilename,
            ACL: "public-read",
            Body: readStream
        })
        .promise();
        
    return Location;
}

