export const extractHashtags = caption => {
    const hashtags = caption.match(/#[\w]+/g);
    if (hashtags) {
        return hashtags.map(hashtag => ({
            where: { tag: hashtag },
            create: { tag: hashtag }
        }));
    }
    return null;
};