import client from "../client";
import jwt from "jsonwebtoken";

export const getUser = async (token) => {
    try {
        if (!token) {
            return null;
        }
        
        const { id } = jwt.verify(token, process.env.SECRET_KEY);
        const user = await client.user.findUnique({ where: { id } });

        if (user) {
            return user;
        } else {
            return null;
        }
    } catch {
        return null;
    }
};

export const protectResolver = (resolver) => (root, args, context, info) => {
    if (!context.loggedInUser) {
        const checkInfo = info.operation.operation === "query";
        
        if (checkInfo) {
            return null;
        } else {
            return {
                loginSucceed: false,
                loginError: "You Need to Login"
            }
        }
    }
    
    return resolver(root, args, context, info);
};

/* Same as Above (Traditional Expression) */
/* export function protectResolver(resolver) {
    return function (root, args, context, info) {
        if (!context.loggedInUser) {
            return {
                loginSucceed: false,
                loginError: "You Need to Login"
            };
        }
        return resolver(root, args, context, info);
    };
} */