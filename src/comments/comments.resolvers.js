export default {
    Comment: {
        isMine: ({ userID }, _, { loggedInUser }) => {
            if (!loggedInUser) {
                return false;
            }
            return userID === loggedInUser.id;
        }
    }
};